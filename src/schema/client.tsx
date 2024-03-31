import * as yup from "yup";

export const ClientSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  diem_tich_luy: yup.number(),
  email: yup.string(),
  kich_hoat_email: yup.number(),
  ngay_sinh: yup.string(),
  so_dien_thoai: yup.string(),
  ten_khach_hang: yup.string(),
  hang_id: yup.number(),
  user_id: yup.number(),
});

export const ClientRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  diem_tich_luy: yup.number(),
  email: yup.string(),
  kich_hoat_email: yup.number(),
  ngay_sinh: yup.string(),
  so_dien_thoai: yup.string(),
  ten_khach_hang: yup.string(),
  hang_id: yup.number(),
  user_id: yup.number(),
});

export const ClientResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  diem_tich_luy: yup.number(),
  email: yup.string(),
  kich_hoat_email: yup.number(),
  ngay_sinh: yup.string(),
  so_dien_thoai: yup.string(),
  ten_khach_hang: yup.string(),
  hang_id: yup.number(),
  user_id: yup.number(),
});

export const ClientErrorSchema = yup.object({});

export type TClient = yup.InferType<typeof ClientSchema>;

export type ClientResponse = yup.InferType<typeof ClientResponseSchema>;

export type ClientError = yup.InferType<typeof ClientErrorSchema>;
