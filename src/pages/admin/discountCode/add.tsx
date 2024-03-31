/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import type { FormInstance } from "antd";
import { Button, DatePicker, Form, Input, Space, message } from "antd";
import {
  useCreateDiscountCodeMutation,
  useDiscountCodeQuery,
} from "../../../services/discountCode";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { format } from "date-fns"; // Thêm import để định dạng thời gian

import { useNavigate } from "react-router-dom";

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

const AddDiscountCodeAdmin: React.FC = () => {
  const [form] = Form.useForm();

  const [createDiscountCode] = useCreateDiscountCodeMutation();

  const navigate = useNavigate();

  const { refetch } = useDiscountCodeQuery();

  const handleFormSubmit = async (values: any) => {
    try {
      const currentDate = new Date(); // Lấy thời gian hiện tại
      const formattedCurrentDate = format(currentDate, "yyyy-MM-dd HH:mm:ss"); // Định dạng thời gian
      const updatedValues = { ...values, create_date: formattedCurrentDate }; // Thêm create_date vào dữ liệu
      await createDiscountCode(updatedValues); // Gửi dữ liệu lên máy chủ

      message.success("Thêm thành công.");

      refetch();

      navigate("/admin/discountCode");
    } catch (error: any) {
      message.error("Lỗi khi thêm: " + error.message);
    }

    console.log("Form values:", values);
  };

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleStartDateChange = (value: any) => {
    setSelectedStartDate(value);
    form.setFieldsValue({ ngay_bat_dau: value });
  };

  const handleEndDateChange = (value: any) => {
    setSelectedEndDate(value);
    form.setFieldsValue({ ngay_ket_thuc: value });
  };

  const disabledDate = (current: any) => {
    return current && current < new Date();
  };

  const validatePositiveInteger = (_: any, value: any) => {
    if (value && !/^[1-9]\d*$/.test(value)) {
      return Promise.reject("Vui lòng nhập số nguyên dương.");
    }
    return Promise.resolve();
  };

  return (
    <>
      <h2 className="title-appoiment">Thêm đợt giảm giá</h2>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
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
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            onChange={handleStartDateChange}
            value={selectedStartDate}
            disabledDate={disabledDate}
          />
        </Form.Item>

        <Form.Item
          name="ngay_ket_thuc"
          label="Ngày kết thúc"
          rules={[{ required: true }]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            onChange={handleEndDateChange}
            value={selectedEndDate}
            disabledDate={disabledDate}
          />
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
          <Space style={{ float: "right" }}>
            <SubmitButton form={form} />
            <Button htmlType="reset">Xóa tất cả</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddDiscountCodeAdmin;
