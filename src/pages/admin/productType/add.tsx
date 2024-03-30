/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space, message } from "antd";
import {
  useCreateProductTypeMutation,
  useProductTypeQuery,
} from "../../../services/productType";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { format } from "date-fns"; // Thêm import để định dạng thời gian

import { useNavigate } from "react-router-dom";

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

const AddProductTypeAdmin: React.FC = () => {
  const [form] = Form.useForm();

  const [createProductType] = useCreateProductTypeMutation();

  const navigate = useNavigate();

  const { refetch } = useProductTypeQuery();

  const handleFormSubmit = async (values: any) => {
    try {
      const currentDate = new Date(); // Lấy thời gian hiện tại
      const formattedCurrentDate = format(currentDate, "yyyy-MM-dd HH:mm:ss"); // Định dạng thời gian
      const updatedValues = { ...values, create_date: formattedCurrentDate }; // Thêm create_date vào dữ liệu
      await createProductType(updatedValues); // Gửi dữ liệu lên máy chủ

      message.success("Thêm thành công.");

      refetch();

      navigate("/admin/productType");
    } catch (error: any) {
      message.error("Lỗi khi thêm: " + error.message);
    }
  };

  return (
    <>
      <h2 className="title-appoiment">Thêm loại sản phẩm</h2>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          name="ten_loai"
          label="Tên loại sản phẩm"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ma_loai"
          label="Mã loại sản phẩm"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="create_date"
          label="Thời gian tạo"
          initialValue={format(new Date(), "yyyy-MM-dd HH:mm:ss")}
          hidden
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

export default AddProductTypeAdmin;
