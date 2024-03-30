/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message, Upload } from "antd";
import { TNews } from "../../../schema/news";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useNewsByIdQuery,
  useUpdateNewsMutation,
} from "../../../services/news";
import { format } from "date-fns"; // Thêm import để định dạng thời gian
import { useEffect } from "react";
import "react-quill/dist/quill.snow.css";

const confirm = () => {
  message.success("Cập nhật thành công.");
};

const cancel = () => {
  message.error("Cập nhật không thành công.");
};
import { useState } from "react"; // Import useState hook
import ReactQuill from "react-quill";

const EditNews = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const news = useNewsByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateNewsMutation, { reset }] = useUpdateNewsMutation();
  const [value, setValue] = useState("");
  const [image, setImage] = useState<string | null>(news.data?.image || null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [updateDate, setUpdateDate] = useState(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  );
  useEffect(() => {
    setUpdateDate(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
  }, []);

  useEffect(() => {
    if (news.data) {
      form.setFieldsValue({
        title: news.data.title,
        image: news.data.image,
        content: news.data.content,
        create_date: news.data.create_date,
        update_date: news.data.update_date,
      });

      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: news.data.image,
        },
      ]);
    }
  }, [news.data, form]);

  const handleImageChange = ({ fileList: newFileList }: any) => {
    if (newFileList.length > 0 && newFileList[0].response) {
      setImage(newFileList[0].response.url);
    } else {
      setImage(null);
    }
    setFileList(newFileList);
  };

  const handleFormSubmit = async (values: TNews) => {
    try {
      const dateNews: TNews = {
        id: Number(id),
        title: values.title,
        image: image ?? "",
        content: values.content,
        create_date: values.create_date,
        update_date: updateDate,
      };
      if (!image && news.data && news.data.image) {
        dateNews.image = news.data.image;
      }
      await updateNewsMutation(dateNews).unwrap();

      confirm();

      reset();

      navigate("/admin/news");
    } catch (error) {
      cancel();
      console.error("Error updating user role:", error);
      reset();
    }
  };

  const onFinishFailed = async (values: any) => {
    console.log("Failed:", values);
  };

  const uploadButton = (
    <div>
      {fileList.length === 0 ? <PlusOutlined /> : <LoadingOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <h2 className="title-appoiment">Cập nhật tin tức</h2>
      <div>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleFormSubmit}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label={<span>Tiêu đề</span>}
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span>Hình ảnh</span>}
            name="img"
            rules={[{ required: true, message: "Vui lòng nhập!" }]}
          >
            <Upload
              name="file"
              action="https://api.cloudinary.com/v1_1/dksgvucji/image/upload"
              data={{
                upload_preset: "wh3rdke8",
                cloud_name: "dksgvucji",
              }}
              listType="picture-card"
              maxCount={1}
              showUploadList={true}
              className="ant-upload-wrapper ant-upload-select"
              fileList={fileList}
              onChange={handleImageChange}
            >
              {fileList.length > 0 ? (
                <img
                  src={fileList[0].url}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            label={<span>Nội dung</span>}
            name="content"
            rules={[{ required: true, message: "Vui lòng nhập!" }]}
          >
            <ReactQuill
              style={{ height: 500 }}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </Form.Item>

          <Form.Item name="create_date" label="Thời gian tạo" hidden>
            <Input disabled />
          </Form.Item>

          <Form.Item name="update_date" label="Thời gian cập nhật" hidden>
            <Input disabled />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditNews;
