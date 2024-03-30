/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message } from "antd";
import { TLockType } from "../../../schema/lockType";
import {
  useLockTypeByIdQuery,
  useUpdateLockTypeMutation,
} from "../../../services/lockType";
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

const EditLockType = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const lockType = useLockTypeByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  ); // Tạo biến update time

  const [updateLockTypeMutation, { reset }] = useUpdateLockTypeMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: lockType.data?.id,
      ten_kieu_khoa: lockType.data?.ten_kieu_khoa,
      create_date: lockType.data?.create_date,
      update_date: lockType.data?.update_date,
    });
  }, [
    form,
    lockType.data?.id,
    lockType.data?.ten_kieu_khoa,
    lockType.data?.create_date,
    lockType.data?.update_date,
  ]);

  const onFinish = async (values: TLockType) => {
    try {
      const updatedValues = { ...values, update_date: updateTime }; // Gán giá trị mới cho update_date
      await updateLockTypeMutation(updatedValues).unwrap();
      confirm();
      reset();
      navigate("/admin/lockType");
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
      <h2 className="title-appoiment">Cập nhật số ngăn</h2>
      <Form
        form={form}
        name="updateLockTypeForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="ten_kieu_khoa"
          label="Tên kiểu khóa"
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

export default EditLockType;
