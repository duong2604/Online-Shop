/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message, Select } from "antd";
import { TSale } from "../../../schema/sale";
import {
  useSaleByIdQuery,
  useUpdateSaleMutation,
} from "../../../services/sale";
import { format } from "date-fns"; // Thêm import để định dạng thời gian
import { useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { THang } from "../../../schema/hang";
import { useHangQuery } from "../../../services/hang";

const confirm = () => {
  message.success("Cập nhật thành công.");
};

const cancel = () => {
  message.error("Cập nhật không thành công.");
};
import { useState } from "react"; // Import useState hook
import TextArea from "antd/es/input/TextArea";

const EditSale = () => {
  const navigate = useNavigate();
  const hang = useHangQuery();
  const { id } = useParams<{ id: string }>();
  const sale = useSaleByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  ); // Tạo biến update time

  const [updateSaleMutation, { reset }] = useUpdateSaleMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: sale.data?.id,
      gia_tri_giam_hd: sale.data?.gia_tri_giam_hd,
      trang_thai_ma_giam_gia: sale.data?.trang_thai_ma_giam_gia,
      loai_giam_gia_hd: sale.data?.loai_giam_gia_hd,
      loai_uu_dai: sale.data?.loai_uu_dai,
      ma_giam_gia: sale.data?.ma_giam_gia,
      mo_ta: sale.data?.mo_ta,
      ngay_bat_dau: sale.data?.ngay_bat_dau,
      ngay_ket_thuc: sale.data?.ngay_ket_thuc,
      so_tien_hoa_don_yeu_cau: sale.data?.so_tien_hoa_don_yeu_cau,
      tieu_de: sale.data?.tieu_de,
      so_luong: sale.data?.so_luong,
      hang_id: sale.data?.hang_id,
      chi_tiet_san_pham_id: sale.data?.chi_tiet_san_pham_id,
      danh_muc_ap_dung_id: sale.data?.danh_muc_ap_dung_id,
      san_pham_ap_dung_id: sale.data?.san_pham_ap_dung_id,
      da_su_dung: sale.data?.da_su_dung,
      gioi_han_su_dung: sale.data?.gioi_han_su_dung,
      create_date: sale.data?.create_date,
      update_date: sale.data?.update_date,
    });
  }, [
    form,
    sale.data?.id,
    sale.data?.gia_tri_giam_hd,
    sale.data?.trang_thai_ma_giam_gia,
    sale.data?.loai_giam_gia_hd,
    sale.data?.loai_uu_dai,
    sale.data?.ma_giam_gia,
    sale.data?.mo_ta,
    sale.data?.ngay_bat_dau,
    sale.data?.ngay_ket_thuc,
    sale.data?.so_tien_hoa_don_yeu_cau,
    sale.data?.tieu_de,
    sale.data?.so_luong,
    sale.data?.hang_id,
    sale.data?.chi_tiet_san_pham_id,
    sale.data?.danh_muc_ap_dung_id,
    sale.data?.san_pham_ap_dung_id,
    sale.data?.da_su_dung,
    sale.data?.gioi_han_su_dung,
    sale.data?.create_date,
    sale.data?.update_date,
  ]);

  const onFinish = async (values: TSale) => {
    try {
      const updatedValues = { ...values, update_date: updateTime }; // Gán giá trị mới cho update_date
      await updateSaleMutation(updatedValues).unwrap();
      confirm();
      reset();
      navigate("/admin/sale");
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
      <h2 className="title-appoiment">Cập nhật mã giảm giá</h2>
      <Form
        form={form}
        name="updateBrandForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>

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
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditSale;
