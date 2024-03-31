/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message } from "antd";
import { TContact } from "../../../schema/contact";
import {
  useContactByIdQuery,
  useUpdateContactMutation,
} from "../../../services/contact";
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
import TextArea from "antd/es/input/TextArea";

const EditContact = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const contact = useContactByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  ); // Tạo biến update time
  const [updateContactMutation, { reset }] = useUpdateContactMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: contact.data?.id,
      ho_ten: contact.data?.ho_ten,
      so_dien_thoai: contact.data?.so_dien_thoai,
      email: contact.data?.email,
      noi_dung: contact.data?.noi_dung,
      create_date: contact.data?.create_date,
      update_date: contact.data?.update_date,
    });
  }, [
    form,
    contact.data?.id,
    contact.data?.ho_ten,
    contact.data?.so_dien_thoai,
    contact.data?.email,
    contact.data?.noi_dung,
    contact.data?.create_date,
    contact.data?.update_date,
  ]);

  const onFinish = async (values: TContact) => {
    try {
      const updatedValues = { ...values, update_date: updateTime }; // Gán giá trị mới cho update_date
      await updateContactMutation(updatedValues).unwrap();
      confirm();
      reset();
      navigate("/admin/contact");
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
      <h2 className="title-appoiment">Cập nhật liên hệ</h2>
      <Form
        form={form}
        name="updateContactForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>

        <Form.Item name="ho_ten" label="HỌ tên" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="so_dien_thoai"
          label="Số điện thoại"
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="noi_dung"
          label="Nội dung"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
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

export default EditContact;
