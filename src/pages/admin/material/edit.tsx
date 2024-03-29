/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message } from "antd";
import { TMaterial } from "../../../schema/material";
import {
  useMaterialByIdQuery,
  useUpdateMaterialMutation,
} from "../../../services/material";
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

const EditMaterial = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const material = useMaterialByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  ); // Tạo biến update time

  const [updateMaterialMutation, { reset }] = useUpdateMaterialMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: material.data?.id,
      ten_chat_lieu: material.data?.ten_chat_lieu,
      create_date: material.data?.create_date,
      update_date: material.data?.update_date,
      mo_ta: material.data?.mo_ta,
    });
  }, [
    form,
    material.data?.id,
    material.data?.ten_chat_lieu,
    material.data?.create_date,
    material.data?.update_date,
    material.data?.mo_ta,
  ]);

  const onFinish = async (values: TMaterial) => {
    try {
      const updatedValues = { ...values, update_date: updateTime }; // Gán giá trị mới cho update_date
      await updateMaterialMutation(updatedValues).unwrap();
      confirm();
      reset();
      navigate("/admin/material");
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
      <h2 className="title-appoiment">Cập nhật chất liệu</h2>
      <Form
        form={form}
        name="updateSizeForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="ten_chat_lieu"
          label="Tên chất liệu"
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

        <Form.Item name="mo_ta" label="Mô tả" rules={[{ required: true }]}>
          <TextArea rows={4} />
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

export default EditMaterial;
