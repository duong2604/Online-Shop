import * as yup from "yup";

export const DiscountCodeSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  gia_tri_giam_hd: yup.string(),
  trang_thai_dot_giam_gia: yup.string(),
  loai_giam_gia_hd: yup.string(),
  loai_uu_dai: yup.string(),
  ngay_bat_dau: yup.string(),
  ngay_ket_thuc: yup.string(),
  so_tien_hoa_don_yeu_cau: yup.string(),
  ten_dot_giam_gia: yup.string(),
});

export const DiscountCodeRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  gia_tri_giam_hd: yup.string(),
  trang_thai_dot_giam_gia: yup.string(),
  loai_giam_gia_hd: yup.string(),
  loai_uu_dai: yup.string(),
  ngay_bat_dau: yup.string(),
  ngay_ket_thuc: yup.string(),
  so_tien_hoa_don_yeu_cau: yup.string(),
  ten_dot_giam_gia: yup.string(),
});

export const DiscountCodeResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  gia_tri_giam_hd: yup.string(),
  trang_thai_dot_giam_gia: yup.string(),
  loai_giam_gia_hd: yup.string(),
  loai_uu_dai: yup.string(),
  ngay_bat_dau: yup.string(),
  ngay_ket_thuc: yup.string(),
  so_tien_hoa_don_yeu_cau: yup.string(),
  ten_dot_giam_gia: yup.string(),
});

export const DiscountCodeErrorSchema = yup.object({});

export type TDiscountCode = yup.InferType<typeof DiscountCodeSchema>;

export type DiscountCodeResponse = yup.InferType<
  typeof DiscountCodeResponseSchema
>;

export type DiscountCodeError = yup.InferType<typeof DiscountCodeErrorSchema>;
