/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space, message } from "antd";
import {
  useCreateMaterialMutation,
  useMaterialQuery,
} from "../../../services/material";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { format } from "date-fns"; // Thêm import để định dạng thời gian

import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

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

const AddMaterialAdmin: React.FC = () => {
  const [form] = Form.useForm();

  const [createMaterial] = useCreateMaterialMutation();

  const navigate = useNavigate();

  const { refetch } = useMaterialQuery();

  const handleFormSubmit = async (values: any) => {
    try {
      const currentDate = new Date(); // Lấy thời gian hiện tại
      const formattedCurrentDate = format(currentDate, "yyyy-MM-dd HH:mm:ss"); // Định dạng thời gian
      const updatedValues = { ...values, create_date: formattedCurrentDate }; // Thêm create_date vào dữ liệu
      await createMaterial(updatedValues); // Gửi dữ liệu lên máy chủ

      message.success("Thêm thành công.");

      refetch();

      navigate("/admin/material");
    } catch (error: any) {
      message.error("Lỗi khi thêm: " + error.message);
    }
  };

  return (
    <>
      <h2 className="title-appoiment">Thêm chất liệu</h2>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          name="ten_chat_lieu"
          label="Tên chất liệu"
          rules={[{ required: true }]}
        >
          <Input />
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

        <Form.Item name="mo_ta" label="Mô tả" rules={[{ required: true }]}>
          <TextArea rows={4} />
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

export default AddMaterialAdmin;
