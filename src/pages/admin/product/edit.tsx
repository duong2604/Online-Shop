/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message, Select } from "antd";
import { TProduct } from "../../../schema/product";
import {
  useProductByIdQuery,
  useUpdateProductMutation,
} from "../../../services/product";
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
import { useStrapMaterialQuery } from "../../../services/strapMaterial";
import { useMaterialQuery } from "../../../services/material";
import { usePatternQuery } from "../../../services/pattern";
import { useSizeeQuery } from "../../../services/kich_thuoc";
import { useLockTypeQuery } from "../../../services/lockType";
import { useProductTypeQuery } from "../../../services/productType";
import { useCompartmentQuery } from "../../../services/compartment";
import { useBrandQuery } from "../../../services/brand";
import TextArea from "antd/es/input/TextArea";
import { TStrapMaterial } from "../../../schema/strapMaterial";
import { TMaterial } from "../../../schema/material";
import { TBrand } from "../../../schema/brand";
import { TCompartment } from "../../../schema/compartment";
import { TProductType } from "../../../schema/productType";
import { TLockType } from "../../../schema/lockType";
import { TSizee } from "../../../schema/kich_thuoc";
import { TPattern } from "../../../schema/pattern";

const EditProduct = () => {
  const strapMaterial = useStrapMaterialQuery();
  const material = useMaterialQuery();
  const pattern = usePatternQuery();
  const sizee = useSizeeQuery();
  const lockType = useLockTypeQuery();
  const productType = useProductTypeQuery();
  const compartment = useCompartmentQuery();
  const brand = useBrandQuery();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const product = useProductByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  ); // Tạo biến update time

  const [updateProductMutation, { reset }] = useUpdateProductMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: product.data?.id,
      ma_san_pham: product.data?.ma_san_pham,
      mo_ta: product.data?.mo_ta,
      phu_hop_su_dung: product.data?.phu_hop_su_dung,
      ten_san_pham: product.data?.ten_san_pham,
      chat_lieu_day_deo_id: product.data?.chat_lieu_day_deo_id,
      chat_lieu_id: product.data?.chat_lieu_id,
      hoa_tiet_id: product.data?.hoa_tiet_id,
      kich_thuoc_id: product.data?.kich_thuoc_id,
      kieu_khoa_id: product.data?.kieu_khoa_id,
      loai_san_pham_id: product.data?.loai_san_pham_id,
      so_ngan_id: product.data?.so_ngan_id,
      thuong_hieu_id: product.data?.thuong_hieu_id,
      create_date: product.data?.create_date,
      update_date: product.data?.update_date,
    });
  }, [
    form,
    product.data?.id,
    product.data?.ma_san_pham,
    product.data?.mo_ta,
    product.data?.phu_hop_su_dung,
    product.data?.ten_san_pham,
    product.data?.chat_lieu_day_deo_id,
    product.data?.chat_lieu_id,
    product.data?.hoa_tiet_id,
    product.data?.kich_thuoc_id,
    product.data?.kieu_khoa_id,
    product.data?.loai_san_pham_id,
    product.data?.so_ngan_id,
    product.data?.thuong_hieu_id,
    product.data?.create_date,
    product.data?.update_date,
  ]);

  const onFinish = async (values: TProduct) => {
    try {
      const updatedValues = { ...values, update_date: updateTime }; // Gán giá trị mới cho update_date
      await updateProductMutation(updatedValues).unwrap();
      confirm();
      reset();
      navigate("/admin/product");
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
      <h2 className="title-appoiment">Cập nhật sản phẩm</h2>
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
          name="ten_san_pham"
          label="Tên sản phẩm"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ma_san_pham"
          label="Mã sản phẩm"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phu_hop_su_dung"
          label="Phù hợp sử dụng"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="mo_ta" label="Mô tả" rules={[{ required: true }]}>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="chat_lieu_day_deo_id"
          label="ID chất liệu dây đeo"
          rules={[{ required: true }]}
        >
          <Select>
            {strapMaterial.data?.map((item: TStrapMaterial) => (
              <Select.Option key={item.id} value={item.id}>
                {item.id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="chat_lieu_id"
          label="ID chất liệu"
          rules={[{ required: true }]}
        >
          <Select>
            {material.data?.map((item: TMaterial) => (
              <Select.Option key={item.id} value={item.id}>
                {item.id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="hoa_tiet_id"
          label="ID họa tiết"
          rules={[{ required: true }]}
        >
          <Select>
            {pattern.data?.map((item: TPattern) => (
              <Select.Option key={item.id} value={item.id}>
                {item.id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="kich_thuoc_id"
          label="ID kích thước"
          rules={[{ required: true }]}
        >
          <Select>
            {sizee.data?.map((item: TSizee) => (
              <Select.Option key={item.id} value={item.id}>
                {item.id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="kieu_khoa_id"
          label="ID kiểu khóa"
          rules={[{ required: true }]}
        >
          <Select>
            {lockType.data?.map((item: TLockType) => (
              <Select.Option key={item.id} value={item.id}>
                {item.id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="loai_san_pham_id"
          label="ID loại sản phẩm"
          rules={[{ required: true }]}
        >
          <Select>
            {productType.data?.map((item: TProductType) => (
              <Select.Option key={item.id} value={item.id}>
                {item.id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="so_ngan_id"
          label="ID số ngăn"
          rules={[{ required: true }]}
        >
          <Select>
            {compartment.data?.map((item: TCompartment) => (
              <Select.Option key={item.id} value={item.id}>
                {item.id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="thuong_hieu_id"
          label="ID thương hiệu"
          rules={[{ required: true }]}
        >
          <Select>
            {brand.data?.map((item: TBrand) => (
              <Select.Option key={item.id} value={item.id}>
                {item.id}
              </Select.Option>
            ))}
          </Select>
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

export default EditProduct;
