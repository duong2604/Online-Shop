/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { TStaff } from "../../../schema/staff";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useStaffByIdQuery,
  useUpdateStaffMutation,
} from "../../../services/staff";
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
import { TUser } from "../../../schema/user";
import { useUserQuery } from "../../../services/user";

const EditStaff = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const staff = useStaffByIdQuery(Number(id));
  const [form] = Form.useForm();
  const user = useUserQuery();

  const [updateStaffMutation, { reset }] = useUpdateStaffMutation();
  const [value, setValue] = useState("");
  const [image, setImage] = useState<string | null>(staff.data?.image || null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [updateDate, setUpdateDate] = useState(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  );
  useEffect(() => {
    setUpdateDate(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
  }, []);

  useEffect(() => {
    if (staff.data) {
      form.setFieldsValue({
        ten_nhan_vien: staff.data.ten_nhan_vien,
        image: staff.data.image,
        ngay_sinh: staff.data.ngay_sinh,
        so_dien_thoai: staff.data.so_dien_thoai,
        gioi_tinh: staff.data.gioi_tinh,
        cccd: staff.data.cccd,
        dia_chi: staff.data.dia_chi,
        user_id: staff.data.user_id,
        create_date: staff.data.create_date,
        update_date: staff.data.update_date,
      });

      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: staff.data.image,
        },
      ]);
    }
  }, [staff.data, form]);

  const handleImageChange = ({ fileList: newFileList }: any) => {
    if (newFileList.length > 0 && newFileList[0].response) {
      setImage(newFileList[0].response.url);
    } else {
      setImage(null);
    }
    setFileList(newFileList);
  };

  const handleFormSubmit = async (values: TStaff) => {
    try {
      const dateStaff: TStaff = {
        id: Number(id),
        ten_nhan_vien: values.ten_nhan_vien,
        image: image ?? "",
        ngay_sinh: values.ngay_sinh,
        so_dien_thoai: values.so_dien_thoai,
        gioi_tinh: values.gioi_tinh,
        cccd: values.cccd,
        dia_chi: values.dia_chi,
        user_id: values.user_id,
        create_date: values.create_date,
        update_date: updateDate,
      };
      if (!image && staff.data && staff.data.image) {
        dateStaff.image = staff.data.image;
      }
      await updateStaffMutation(dateStaff).unwrap();

      confirm();

      reset();

      navigate("/admin/staff");
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
      <h2 className="title-appoiment">Cập nhật nhân viên</h2>
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
            name="ten_nhan_vien"
            label="Tên nhân viên"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="ngay_sinh"
            label="Ngày sinh"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gioi_tinh"
            label="Giới tính"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="so_dien_thoai"
            label="Số điện thoại"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="cccd"
            label="Căn cước công dân"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dia_chi"
            label="Địa chỉ"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="user_id"
            label="ID User"
            rules={[{ required: true }]}
          >
            <Select>
              {user.data?.map((item: TUser) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.id}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="image" label="Hình ảnh" rules={[{ required: true }]}>
            <Upload
              name="file"
              action="https://api.cloudinary.com/v1_1/dksgvucji/image/upload"
              data={{
                upload_preset: "wh3rdke8",
                cloud_name: "dksgvucji",
              }}
              listType="picture-card"
              maxCount={1}
              showUploadList={false}
              className="ant-upload-wrapper ant-upload-select"
              onChange={handleImageChange}
            >
              {image ? (
                <img src={image} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            name="create_date"
            label="Thời gian tạo"
            initialValue={format(new Date(), "yyyy-MM-dd HH:mm:ss")} // Giá trị mặc định là thời gian hiện tại
            hidden // Ẩn trường này để không cho người dùng nhập
          >
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

export default EditStaff;
