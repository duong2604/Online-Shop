/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message } from "antd";
import { TDiscountCode } from "../../../schema/discountCode";
import {
  useDiscountCodeByIdQuery,
  useUpdateDiscountCodeMutation,
} from "../../../services/discountCode";
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

const EditDiscountCode = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const discountCode = useDiscountCodeByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  ); // Tạo biến update time

  const [updateDiscountCodeMutation, { reset }] =
    useUpdateDiscountCodeMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: discountCode.data?.id,
      ten_dot_giam_gia: discountCode.data?.ten_dot_giam_gia,
      gia_tri_giam_hd: discountCode.data?.gia_tri_giam_hd,
      loai_giam_gia_hd: discountCode.data?.loai_giam_gia_hd,
      loai_uu_dai: discountCode.data?.loai_uu_dai,
      so_tien_hoa_don_yeu_cau: discountCode.data?.so_tien_hoa_don_yeu_cau,
      ngay_bat_dau: discountCode.data?.ngay_bat_dau,
      ngay_ket_thuc: discountCode.data?.ngay_ket_thuc,
      create_date: discountCode.data?.create_date,
      update_date: discountCode.data?.update_date,
      trang_thai_dot_giam_gia: discountCode.data?.trang_thai_dot_giam_gia,
    });
  }, [
    form,
    discountCode.data?.id,
    discountCode.data?.ten_dot_giam_gia,
    discountCode.data?.gia_tri_giam_hd,
    discountCode.data?.loai_giam_gia_hd,
    discountCode.data?.loai_uu_dai,
    discountCode.data?.so_tien_hoa_don_yeu_cau,
    discountCode.data?.ngay_bat_dau,
    discountCode.data?.ngay_ket_thuc,
    discountCode.data?.create_date,
    discountCode.data?.update_date,
    discountCode.data?.trang_thai_dot_giam_gia,
  ]);

  const onFinish = async (values: TDiscountCode) => {
    try {
      const updatedValues = { ...values, update_date: updateTime }; // Gán giá trị mới cho update_date
      await updateDiscountCodeMutation(updatedValues).unwrap();
      confirm();
      reset();
      navigate("/admin/discountCode");
    } catch (error) {
      cancel();
      console.error("Lỗi cập nhật:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const validatePositiveInteger = (_: any, value: any) => {
    if (value && !/^[1-9]\d*$/.test(value)) {
      return Promise.reject("Vui lòng nhập số nguyên dương.");
    }
    return Promise.resolve();
  };

  return (
    <>
      <h2 className="title-appoiment">Cập nhật đợt giảm giá</h2>
      <Form
        form={form}
        name="updateDiscountCodeForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="ten_dot_giam_gia"
          label="Tên đợt giảm giá"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gia_tri_giam_hd"
          label="Giá trị giảm hóa đơn"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="loai_giam_gia_hd"
          label="Loại giảm giá hóa đơn"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="loai_uu_dai"
          label="Loại ưu đãi"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="so_tien_hoa_don_yeu_cau"
          label="Số tiền hóa đơn yêu cầu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số tiền hóa đơn yêu cầu.",
            },
            { validator: validatePositiveInteger },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="ngay_bat_dau"
          label="Ngày bắt đầu"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ngay_ket_thuc"
          label="Ngày kết thúc"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="trang_thai_dot_giam_gia"
          label="Trạng thái đợt giảm giá"
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

export default EditDiscountCode;
