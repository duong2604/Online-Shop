import * as yup from "yup";

export const CommentSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  diem_danh_gia: yup.string(),
  email: yup.string(),
  ho_ten: yup.string(),
  noi_dung: yup.string(),
  sdt: yup.string(),
  chi_tiet_san_pham_id: yup.number(),
  trang_thai_binh_luan: yup.number(),
});

export const CommentRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  diem_danh_gia: yup.string(),
  email: yup.string(),
  ho_ten: yup.string(),
  noi_dung: yup.string(),
  sdt: yup.string(),
  chi_tiet_san_pham_id: yup.number(),
  trang_thai_binh_luan: yup.number(),
});

export const CommentResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  diem_danh_gia: yup.string(),
  email: yup.string(),
  ho_ten: yup.string(),
  noi_dung: yup.string(),
  sdt: yup.string(),
  chi_tiet_san_pham_id: yup.number(),
  trang_thai_binh_luan: yup.number(),
});

export const CommentErrorSchema = yup.object({});

export type TComment = yup.InferType<typeof CommentSchema>;

export type CommentResponse = yup.InferType<typeof CommentResponseSchema>;

export type CommentError = yup.InferType<typeof CommentErrorSchema>;
