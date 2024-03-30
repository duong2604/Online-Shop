/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message } from "antd";
import { TProductType } from "../../../schema/productType";
import {
  useProductTypeByIdQuery,
  useUpdateProductTypeMutation,
} from "../../../services/productType";
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

const EditProductType = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productType = useProductTypeByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  ); // Tạo biến update time

  const [updateProductTypeMutation, { reset }] = useUpdateProductTypeMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: productType.data?.id,
      ten_loai: productType.data?.ten_loai,
      ma_loai: productType.data?.ma_loai,
      create_date: productType.data?.create_date,
      update_date: productType.data?.update_date,
    });
  }, [
    form,
    productType.data?.id,
    productType.data?.ten_loai,
    productType.data?.ma_loai,
    productType.data?.create_date,
    productType.data?.update_date,
  ]);

  const onFinish = async (values: TProductType) => {
    try {
      const updatedValues = { ...values, update_date: updateTime }; // Gán giá trị mới cho update_date
      await updateProductTypeMutation(updatedValues).unwrap();
      confirm();
      reset();
      navigate("/admin/productType");
    } catch (error) {
      cancel();
      console.error("Lỗi cập nhật:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h2 className="title-appoiment">Cập nhật loại sản phẩm</h2>
      <Form
        form={form}
        name="updateBrandForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>

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

        <Form.Item name="create_date" label="Thời gian tạo" hidden>
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="update_date"
          label="Thời gian cập nhật"
          initialValue={updateTime} // Sử dụng biến updateTime để hiển thị giá trị
          hidden
        >
          <Input disabled />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditProductType;
