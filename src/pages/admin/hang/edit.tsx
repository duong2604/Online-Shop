/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message } from "antd";
import { THang } from "../../../schema/hang";
import {
  useHangByIdQuery,
  useUpdateHangMutation,
} from "../../../services/hang";
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

const EditHang = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const hang = useHangByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  ); // Tạo biến update time

  const [updateHangMutation, { reset }] = useUpdateHangMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: hang.data?.id,
      ten_hang: hang.data?.ten_hang,
      ma_hang: hang.data?.ma_hang,
      create_date: hang.data?.create_date,
      update_date: hang.data?.update_date,
    });
  }, [
    form,
    hang.data?.id,
    hang.data?.ten_hang,
    hang.data?.ma_hang,
    hang.data?.create_date,
    hang.data?.update_date,
  ]);

  const onFinish = async (values: THang) => {
    try {
      const updatedValues = { ...values, update_date: updateTime }; // Gán giá trị mới cho update_date
      await updateHangMutation(updatedValues).unwrap();
      confirm();
      reset();
      navigate("/admin/hang");
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
      <h2 className="title-appoiment">Cập nhật hàng</h2>
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
          name="ten_hang"
          label="Tên hàng"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="ma_hang" label="Mã hàng" rules={[{ required: true }]}>
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

export default EditHang;
