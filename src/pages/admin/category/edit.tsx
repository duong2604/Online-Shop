/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message } from "antd";
import { TCategory } from "../../../schema/category";
import {
  useCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../../services/category";
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

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const category = useCategoryByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  ); // Tạo biến update time

  const [updateCategoryMutation, { reset }] = useUpdateCategoryMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: category.data?.id,
      ten_danh_muc: category.data?.ten_danh_muc,
      ma_danh_muc: category.data?.ma_danh_muc,
      is_parent: category.data?.is_parent,
      create_date: category.data?.create_date,
      update_date: category.data?.update_date,
    });
  }, [
    form,
    category.data?.id,
    category.data?.ten_danh_muc,
    category.data?.ma_danh_muc,
    category.data?.is_parent,
    category.data?.create_date,
    category.data?.update_date,
  ]);

  const onFinish = async (values: TCategory) => {
    try {
      const updatedValues = { ...values, update_date: updateTime }; // Gán giá trị mới cho update_date
      await updateCategoryMutation(updatedValues).unwrap();
      confirm();
      reset();
      navigate("/admin/category");
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
      <h2 className="title-appoiment">Cập nhật danh mục</h2>
      <Form
        form={form}
        name="updateCategoryForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="ten_danh_muc"
          label="Tên danh mục"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ma_danh_muc"
          label="Mã danh mục"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="is_parent"
          label="Is Parent"
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

export default EditCategory;
