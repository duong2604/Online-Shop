/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message, Select } from "antd";
import { TComment } from "../../../schema/comment";
import {
  useCommentByIdQuery,
  useUpdateCommentMutation,
} from "../../../services/comment";
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
import { TCommentStatus } from "../../../schema/commentStatus";
import { useCommentStatusQuery } from "../../../services/commentStatus";

const EditComment = () => {
  const commentStatus = useCommentStatusQuery();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const comment = useCommentByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  ); // Tạo biến update time

  const [updateCommentMutation, { reset }] = useUpdateCommentMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: comment.data?.id,
      ho_ten: comment.data?.ho_ten,
      email: comment.data?.email,
      sdt: comment.data?.sdt,
      diem_danh_gia: comment.data?.diem_danh_gia,
      noi_dung: comment.data?.noi_dung,
      chi_tiet_san_pham_id: comment.data?.chi_tiet_san_pham_id,
      trang_thai_binh_luan: comment.data?.trang_thai_binh_luan,
      create_date: comment.data?.create_date,
      update_date: comment.data?.update_date,
    });
  }, [
    form,
    comment.data?.id,
    comment.data?.ho_ten,
    comment.data?.email,
    comment.data?.sdt,
    comment.data?.diem_danh_gia,
    comment.data?.noi_dung,
    comment.data?.chi_tiet_san_pham_id,
    comment.data?.trang_thai_binh_luan,
    comment.data?.create_date,
    comment.data?.update_date,
  ]);

  const onFinish = async (values: TComment) => {
    try {
      const updatedValues = { ...values, update_date: updateTime }; // Gán giá trị mới cho update_date
      await updateCommentMutation(updatedValues).unwrap();
      confirm();
      reset();
      navigate("/admin/comment");
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
      <h2 className="title-appoiment">Cập nhật bình luận</h2>
      <Form
        form={form}
        name="updateCommentForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>

        <Form.Item name="ho_ten" label="Họ tên" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="sdt"
          label="Số điện thoại"
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="noi_dung"
          label="Nội dung"
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="diem_danh_gia"
          label="Điểm đánh giá"
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="chi_tiet_san_pham_id"
          label="ID chi tiết sản phẩm"
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="trang_thai_binh_luan"
          label="Trạng thái bình luận"
          rules={[{ required: true }]}
        >
          <Select>
            {commentStatus.data?.map((item: TCommentStatus) => (
              <Select.Option key={item.id} value={item.id}>
                {item.id}
              </Select.Option>
            ))}
          </Select>
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

export default EditComment;
