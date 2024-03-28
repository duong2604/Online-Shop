/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message } from "antd";
import { TPattern } from "../../../schema/pattern";
import {
  usePatternByIdQuery,
  useUpdatePatternMutation,
} from "../../../services/pattern";
import { format } from "date-fns"; // Thêm import để định dạng thời gian
import { useEffect } from "react";

const confirm = () => {
  message.success("Cập nhật thành công.");
};

const cancel = () => {
  message.error("Cập nhật không thành công.");
};
import { useState } from "react"; // Import useState hook

const EditPattern = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const pattern = usePatternByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  ); // Tạo biến update time

  const [updatePatternMutation, { reset }] = useUpdatePatternMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: pattern.data?.id,
      ten_hoa_tiet: pattern.data?.ten_hoa_tiet,
      create_date: pattern.data?.create_date,
      update_date: pattern.data?.update_date,
      mo_ta: pattern.data?.mo_ta,
    });
  }, [
    form,
    pattern.data?.id,
    pattern.data?.ten_hoa_tiet,
    pattern.data?.create_date,
    pattern.data?.update_date,
    pattern.data?.mo_ta,
  ]);

  const onFinish = async (values: TPattern) => {
    try {
      const updatedValues = { ...values, update_date: updateTime }; // Gán giá trị mới cho update_date
      await updatePatternMutation(updatedValues).unwrap();
      confirm();
      reset();
      navigate("/admin/pattern");
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
      <h2 className="title-appoiment">Cập nhật họa tiết</h2>
      <Form
        form={form}
        name="updatePatternForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>

        <Form.Item name="ten_hoa_tiet" label="Tên" rules={[{ required: true }]}>
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
          <Input />
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

export default EditPattern;
