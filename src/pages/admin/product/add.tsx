/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Select, Space, message } from "antd";
import {
  useCreateProductMutation,
  useProductQuery,
} from "../../../services/product";
import { TStrapMaterial } from "../../../schema/strapMaterial";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { format } from "date-fns"; // Thêm import để định dạng thời gian

import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { useStrapMaterialQuery } from "../../../services/strapMaterial";
import { useMaterialQuery } from "../../../services/material";
import { TMaterial } from "../../../schema/material";
import { TPattern } from "../../../schema/pattern";
import { usePatternQuery } from "../../../services/pattern";
import { useSizeeQuery } from "../../../services/kich_thuoc";
import { TSizee } from "../../../schema/kich_thuoc";
import { TLockType } from "../../../schema/lockType";
import { useLockTypeQuery } from "../../../services/lockType";
import { TProductType } from "../../../schema/productType";
import { useProductTypeQuery } from "../../../services/productType";
import { TBrand } from "../../../schema/brand";
import { TCompartment } from "../../../schema/compartment";
import { useCompartmentQuery } from "../../../services/compartment";
import { useBrandQuery } from "../../../services/brand";

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

const AddProductAdmin: React.FC = () => {
  const [form] = Form.useForm();
  const strapMaterial = useStrapMaterialQuery();
  const material = useMaterialQuery();
  const pattern = usePatternQuery();
  const sizee = useSizeeQuery();
  const lockType = useLockTypeQuery();
  const productType = useProductTypeQuery();
  const compartment = useCompartmentQuery();
  const brand = useBrandQuery();

  const [createProduct] = useCreateProductMutation();

  const navigate = useNavigate();

  const { refetch } = useProductQuery();

  const handleFormSubmit = async (values: any) => {
    try {
      const currentDate = new Date(); // Lấy thời gian hiện tại
      const formattedCurrentDate = format(currentDate, "yyyy-MM-dd HH:mm:ss"); // Định dạng thời gian
      const updatedValues = { ...values, create_date: formattedCurrentDate }; // Thêm create_date vào dữ liệu
      await createProduct(updatedValues); // Gửi dữ liệu lên máy chủ

      message.success("Thêm thành công.");

      refetch();

      navigate("/admin/product");
    } catch (error: any) {
      message.error("Lỗi khi thêm: " + error.message);
    }
  };

  return (
    <>
      <h2 className="title-appoiment">Thêm sản phẩm</h2>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
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
          <Space style={{ float: "right" }}>
            <SubmitButton form={form} />
            <Button htmlType="reset">Xóa tất cả</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProductAdmin;
