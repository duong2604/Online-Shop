/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message } from "antd";
import { TCommentStatus } from "../../../schema/commentStatus";
import {
  useCommentStatusByIdQuery,
  useUpdateCommentStatusMutation,
} from "../../../services/commentStatus";
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

const EditCommentStatus = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const commentStatus = useCommentStatusByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  ); // Tạo biến update time

  const [updateCommentStatusMutation, { reset }] =
    useUpdateCommentStatusMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: commentStatus.data?.id,
      comment_status_name: commentStatus.data?.comment_status_name,
      create_date: commentStatus.data?.create_date,
      update_date: commentStatus.data?.update_date,
    });
  }, [
    form,
    commentStatus.data?.id,
    commentStatus.data?.comment_status_name,
    commentStatus.data?.create_date,
    commentStatus.data?.update_date,
  ]);

  const onFinish = async (values: TCommentStatus) => {
    try {
      const updatedValues = { ...values, update_date: updateTime }; // Gán giá trị mới cho update_date
      await updateCommentStatusMutation(updatedValues).unwrap();
      confirm();
      reset();
      navigate("/admin/commentStatus");
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
      <h2 className="title-appoiment">Cập nhật trạng thái bình luận</h2>
      <Form
        form={form}
        name="updateCommentStatusForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="comment_status_name"
          label="Trạng thái bình luận"
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
          initialValue={updateTime}
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

export default EditCommentStatus;
