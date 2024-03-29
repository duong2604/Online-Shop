/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/layouts/admin/appointments.scss";
import { Button, Form, Input, message, Select } from "antd";
import { TSizee } from "../../../schema/kich_thuoc";
import {
  useSizeeByIdQuery,
  useUpdateSizeeMutation,
} from "../../../services/kich_thuoc";
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
import { TSize } from "../../../schema/kich_co";
import { useSizeQuery } from "../../../services/kich_co";

const EditSizee = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const sizee = useSizeeByIdQuery(Number(id));
  const size = useSizeQuery();
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  ); // Tạo biến update time

  const [updateSizeeMutation, { reset }] = useUpdateSizeeMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: sizee.data?.id,
      create_date: sizee.data?.create_date,
      update_date: sizee.data?.update_date,
      chieu_cao: sizee.data?.chieu_cao,
      chieu_dai: sizee.data?.chieu_dai,
      chieu_rong: sizee.data?.chieu_rong,
      kich_co_id: sizee.data?.kich_co_id,
    });
  }, [
    form,
    sizee.data?.id,
    sizee.data?.create_date,
    sizee.data?.update_date,
    sizee.data?.chieu_cao,
    sizee.data?.chieu_dai,
    sizee.data?.chieu_rong,
    sizee.data?.kich_co_id,
  ]);

  const onFinish = async (values: TSizee) => {
    try {
      const updatedValues = { ...values, update_date: updateTime }; // Gán giá trị mới cho update_date
      await updateSizeeMutation(updatedValues).unwrap();
      confirm();
      reset();
      navigate("/admin/sizee");
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
      <h2 className="title-appoiment">Cập nhật kích thước</h2>
      <Form
        form={form}
        name="updateSizeeForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item name="id" label="ID">
          <Input disabled />
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

        <Form.Item
          name="chieu_cao"
          label="Chiều cao"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="chieu_dai"
          label="Chiều dài"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="chieu_rong"
          label="Chiều rộng"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "Vui lòng chọn!" }]}
          name="kich_co_id"
          label="ID kích cỡ"
        >
          <Select>
            {size.data?.map((item: TSize) => (
              <Select.Option key={item.id} value={item.id}>
                {item.id}
              </Select.Option>
            ))}
          </Select>
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

export default EditSizee;
