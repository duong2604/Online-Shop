/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message, Select } from "antd";
import { TClient } from "../../../schema/client";
import {
  useClientByIdQuery,
  useUpdateClientMutation,
} from "../../../services/client";
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
import { TUser } from "../../../schema/user";
import { THang } from "../../../schema/hang";
import { useHangQuery } from "../../../services/hang";
import { useUserQuery } from "../../../services/user";

const EditClient = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const client = useClientByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  ); // Tạo biến update time
  const hang = useHangQuery();
  const user = useUserQuery();
  const [updateClientMutation, { reset }] = useUpdateClientMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: client.data?.id,
      ten_khach_hang: client.data?.ten_khach_hang,
      ngay_sinh: client.data?.ngay_sinh,
      so_dien_thoai: client.data?.so_dien_thoai,
      email: client.data?.email,
      diem_tich_luy: client.data?.diem_tich_luy,
      hang_id: client.data?.hang_id,
      user_id: client.data?.user_id,
      kich_hoat_email: client.data?.kich_hoat_email,
      create_date: client.data?.create_date,
      update_date: client.data?.update_date,
    });
  }, [
    form,
    client.data?.id,
    client.data?.ten_khach_hang,
    client.data?.ngay_sinh,
    client.data?.so_dien_thoai,
    client.data?.email,
    client.data?.diem_tich_luy,
    client.data?.hang_id,
    client.data?.user_id,
    client.data?.kich_hoat_email,
    client.data?.create_date,
    client.data?.update_date,
  ]);

  const onFinish = async (values: TClient) => {
    try {
      const updatedValues = { ...values, update_date: updateTime }; // Gán giá trị mới cho update_date
      await updateClientMutation(updatedValues).unwrap();
      confirm();
      reset();
      navigate("/admin/client");
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
      <h2 className="title-appoiment">Cập nhật khách hàng</h2>
      <Form
        form={form}
        name="updateClientForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="ten_khach_hang"
          label="Tên khách hàng"
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
          name="so_dien_thoai"
          label="Số điện thoại"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="diem_tich_luy"
          label="Điểm tích lũy"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="hang_id" label="ID Hàng" rules={[{ required: true }]}>
          <Select>
            {hang.data?.map((item: THang) => (
              <Select.Option key={item.id} value={item.id}>
                {item.id}
              </Select.Option>
            ))}
          </Select>
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

        <Form.Item
          name="kich_hoat_email"
          label="Kích hoạt email"
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
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditClient;
