import * as yup from "yup";

export const StaffSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  cccd: yup.string(),
  image: yup.string(),
  dia_chi: yup.string(),
  gioi_tinh: yup.string(),
  ngay_sinh: yup.string(),
  so_dien_thoai: yup.string(),
  ten_nhan_vien: yup.string(),
  user_id: yup.string(),
});

export const StaffRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  cccd: yup.string(),
  image: yup.string(),
  dia_chi: yup.string(),
  gioi_tinh: yup.string(),
  ngay_sinh: yup.string(),
  so_dien_thoai: yup.string(),
  ten_nhan_vien: yup.string(),
  user_id: yup.string(),
});

export const StaffResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  cccd: yup.string(),
  image: yup.string(),
  dia_chi: yup.string(),
  gioi_tinh: yup.string(),
  ngay_sinh: yup.string(),
  so_dien_thoai: yup.string(),
  ten_nhan_vien: yup.string(),
  user_id: yup.string(),
});

export const StaffErrorSchema = yup.object({});

export type TStaff = yup.InferType<typeof StaffSchema>;

export type StaffResponse = yup.InferType<typeof StaffResponseSchema>;

export type StaffError = yup.InferType<typeof StaffErrorSchema>;
