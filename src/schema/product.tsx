import * as yup from "yup";

export const ProductSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ma_san_pham: yup.string(),
  mo_ta: yup.string(),
  phu_hop_su_dung: yup.string(),
  ten_san_pham: yup.string(),
  chat_lieu_day_deo_id: yup.number(),
  chat_lieu_id: yup.number(),
  hoa_tiet_id: yup.number(),
  kich_thuoc_id: yup.number(),
  kieu_khoa_id: yup.number(),
  loai_san_pham_id: yup.number(),
  so_ngan_id: yup.number(),
  thuong_hieu_id: yup.number(),
});

export const ProductRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ma_san_pham: yup.string(),
  mo_ta: yup.string(),
  phu_hop_su_dung: yup.string(),
  ten_san_pham: yup.string(),
  chat_lieu_day_deo_id: yup.number(),
  chat_lieu_id: yup.number(),
  hoa_tiet_id: yup.number(),
  kich_thuoc_id: yup.number(),
  kieu_khoa_id: yup.number(),
  loai_san_pham_id: yup.number(),
  so_ngan_id: yup.number(),
  thuong_hieu_id: yup.number(),
});

export const ProductResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ma_san_pham: yup.string(),
  mo_ta: yup.string(),
  phu_hop_su_dung: yup.string(),
  ten_san_pham: yup.string(),
  chat_lieu_day_deo_id: yup.number(),
  chat_lieu_id: yup.number(),
  hoa_tiet_id: yup.number(),
  kich_thuoc_id: yup.number(),
  kieu_khoa_id: yup.number(),
  loai_san_pham_id: yup.number(),
  so_ngan_id: yup.number(),
  thuong_hieu_id: yup.number(),
});

export const ProductErrorSchema = yup.object({});

export type TProduct = yup.InferType<typeof ProductSchema>;

export type ProductResponse = yup.InferType<typeof ProductResponseSchema>;

export type ProductError = yup.InferType<typeof ProductErrorSchema>;
