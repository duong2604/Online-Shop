/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message } from "antd";
import { TStrapMaterial } from "../../../schema/strapMaterial";
import {
  useStrapMaterialByIdQuery,
  useUpdateStrapMaterialMutation,
} from "../../../services/strapMaterial";
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

const EditStrapMaterial = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const strapMaterial = useStrapMaterialByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  ); // Tạo biến update time

  const [updateStrapMaterialMutation, { reset }] =
    useUpdateStrapMaterialMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: strapMaterial.data?.id,
      ten_chat_lieu_day_deo: strapMaterial.data?.ten_chat_lieu_day_deo,
      create_date: strapMaterial.data?.create_date,
      update_date: strapMaterial.data?.update_date,
    });
  }, [
    form,
    strapMaterial.data?.id,
    strapMaterial.data?.ten_chat_lieu_day_deo,
    strapMaterial.data?.create_date,
    strapMaterial.data?.update_date,
  ]);

  const onFinish = async (values: TStrapMaterial) => {
    try {
      const updatedValues = { ...values, update_date: updateTime }; // Gán giá trị mới cho update_date
      await updateStrapMaterialMutation(updatedValues).unwrap();
      confirm();
      reset();
      navigate("/admin/strapMaterial");
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
      <h2 className="title-appoiment">Cập nhật chất liệu dây đeo</h2>
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
          name="ten_chat_lieu_day_deo"
          label="Tên chất liệu dây đeo"
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

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditStrapMaterial;
