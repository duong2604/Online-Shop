/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Select, Space, message } from "antd";
import { useCreateSaleMutation, useSaleQuery } from "../../../services/sale";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { format } from "date-fns"; // Thêm import để định dạng thời gian

import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { THang } from "../../../schema/hang";
import { useHangQuery } from "../../../services/hang";

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

const AddSaleAdmin: React.FC = () => {
  const [form] = Form.useForm();

  const [createSale] = useCreateSaleMutation();

  const navigate = useNavigate();

  const { refetch } = useSaleQuery();
  const hang = useHangQuery();

  const handleFormSubmit = async (values: any) => {
    try {
      const currentDate = new Date(); // Lấy thời gian hiện tại
      const formattedCurrentDate = format(currentDate, "yyyy-MM-dd HH:mm:ss"); // Định dạng thời gian
      const updatedValues = { ...values, create_date: formattedCurrentDate }; // Thêm create_date vào dữ liệu
      await createSale(updatedValues); // Gửi dữ liệu lên máy chủ

      message.success("Thêm thành công.");

      refetch();

      navigate("/admin/sale");
    } catch (error: any) {
      message.error("Lỗi khi thêm: " + error.message);
    }
  };

  return (
    <>
      <h2 className="title-appoiment">Thêm mã giảm giá</h2>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          name="gia_tri_giam_hd"
          label="Giá trị giảm hóa đơn"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="trang_thai_ma_giam_gia"
          label="Trạng thái mã giảm giá"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="loai_giam_gia_hd"
          label="Loại giảm giá hóa đơn"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="loai_uu_dai"
          label="Loại ưu đãi"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="ma_giam_gia"
          label="Mã giảm giá"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="mo_ta" label="Mô tả" rules={[{ required: true }]}>
          <TextArea rows={4} />
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
          label="Ngày kết thúsc"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="so_tien_hoa_don_yeu_cau"
          label="Số tiền hóa đơn yêu cầu"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item name="tieu_de" label="Tiêu đề" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="so_luong"
          label="Số lượng"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item name="hang_id" label="Hàng" rules={[{ required: true }]}>
          <Select>
            {hang.data?.map((item: THang) => (
              <Select.Option key={item.id} value={item.id}>
                {item.id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="chi_tiet_san_pham_id"
          label="ID chi tiết sản phẩm"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="danh_muc_ap_dung_id"
          label="ID danh mục áp dụng"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="san_pham_ap_dung_id"
          label="ID sản phẩm áp dụng"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="da_su_dung"
          label="Đã sử dụng"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="gioi_han_su_dung"
          label="Giới hạn sử dụng"
          rules={[{ required: true }]}
        >
          <Input type="number" />
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

export default AddSaleAdmin;
