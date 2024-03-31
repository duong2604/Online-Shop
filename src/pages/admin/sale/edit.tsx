/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message } from "antd";
import { TColor } from "../../../schema/color";
import {
  useColorByIdQuery,
  useUpdateColorMutation,
} from "../../../services/color";
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

const EditColor = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const color = useColorByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  ); // Tạo biến update time

  const [updateColorMutation, { reset }] = useUpdateColorMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: color.data?.id,
      ten_mau: color.data?.ten_mau,
      ma_mau: color.data?.ma_mau,
      create_date: color.data?.create_date,
      update_date: color.data?.update_date,
    });
  }, [
    form,
    color.data?.id,
    color.data?.ten_mau,
    color.data?.ma_mau,
    color.data?.create_date,
    color.data?.update_date,
  ]);

  const onFinish = async (values: TColor) => {
    try {
      const updatedValues = { ...values, update_date: updateTime }; // Gán giá trị mới cho update_date
      await updateColorMutation(updatedValues).unwrap();
      confirm();
      reset();
      navigate("/admin/color");
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
      <h2 className="title-appoiment">Cập nhật màu sắc</h2>
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

        <Form.Item name="ten_mau" label="Tên màu" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="ma_mau" label="Mã màu" rules={[{ required: true }]}>
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

export default EditColor;
