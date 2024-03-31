/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Select, Space, message } from "antd";
import {
  useCreateClientMutation,
  useClientQuery,
} from "../../../services/client";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { format } from "date-fns"; // Thêm import để định dạng thời gian

import { useNavigate } from "react-router-dom";
import { THang } from "../../../schema/hang";
import { useHangQuery } from "../../../services/hang";
import { TUser } from "../../../schema/user";
import { useUserQuery } from "../../../services/user";

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

const AddClientAdmin: React.FC = () => {
  const [form] = Form.useForm();

  const [createClient] = useCreateClientMutation();

  const navigate = useNavigate();

  const hang = useHangQuery();
  const user = useUserQuery();

  const { refetch } = useClientQuery();

  const handleFormSubmit = async (values: any) => {
    try {
      const currentDate = new Date(); // Lấy thời gian hiện tại
      const formattedCurrentDate = format(currentDate, "yyyy-MM-dd HH:mm:ss"); // Định dạng thời gian
      const updatedValues = { ...values, create_date: formattedCurrentDate }; // Thêm create_date vào dữ liệu
      await createClient(updatedValues); // Gửi dữ liệu lên máy chủ

      message.success("Thêm thành công.");

      refetch();

      navigate("/admin/client");
    } catch (error: any) {
      message.error("Lỗi khi thêm: " + error.message);
    }
  };

  return (
    <>
      <h2 className="title-appoiment">Thêm khách hàng</h2>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
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
          <Space style={{ float: "right" }}>
            <SubmitButton form={form} />
            <Button htmlType="reset">Xóa tất cả</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddClientAdmin;
