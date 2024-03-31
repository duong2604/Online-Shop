/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Select, Space, Upload, message } from "antd";
import { useCreateStaffMutation, useStaffQuery } from "../../../services/staff";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { format } from "date-fns"; // Thêm import để định dạng thời gian
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useUserQuery } from "../../../services/user";
import { TUser } from "../../../schema/user";

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = React.useState(false);

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Gửi
    </Button>
  );
};

const AddStaffAdmin: React.FC = () => {
  const [form] = Form.useForm();

  const [createStaff, { isLoading: isAddLoading }] = useCreateStaffMutation();

  const navigate = useNavigate();

  const { refetch } = useStaffQuery();
  const user = useUserQuery();

  const [image, setImage] = useState<any | null>(null);

  const handleFormSubmit = async (values: any) => {
    try {
      const currentDate = new Date(); // Lấy thời gian hiện tại
      const formattedCurrentDate = format(currentDate, "yyyy-MM-dd HH:mm:ss"); // Định dạng thời gian
      const updatedValues = { ...values, create_date: formattedCurrentDate }; // Thêm create_date vào dữ liệu
      await createStaff(updatedValues); // Gửi dữ liệu lên máy chủ

      message.success("Thêm thành công.");

      refetch();

      navigate("/admin/staff");
    } catch (error: any) {
      message.error("Lỗi khi thêm: " + error.message);
    }
  };

  const handleImageChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImage(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const uploadButton = (
    <div>
      {isAddLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <h2 className="title-appoiment">Thêm nhân viên</h2>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
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

        <Form.Item name="dia_chi" label="Địa chỉ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="user_id" label="ID User" rules={[{ required: true }]}>
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
          <Space style={{ float: "right" }}>
            <SubmitButton form={form} />
            <Button htmlType="reset">Xóa tất cả</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddStaffAdmin;
