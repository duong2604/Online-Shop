import * as yup from "yup";

export const SaleSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  gia_tri_giam_hd: yup.number(),
  trang_thai_ma_giam_gia: yup.number(),
  loai_giam_gia_hd: yup.number(),
  loai_uu_dai: yup.number(),
  ma_giam_gia: yup.string(),
  mo_ta: yup.string(),
  ngay_bat_dau: yup.string(),
  ngay_ket_thuc: yup.string(),
  so_tien_hoa_don_yeu_cau: yup.number(),
  tieu_de: yup.string(),
  so_luong: yup.number(),
  hang_id: yup.number(),
  chi_tiet_san_pham_id: yup.number(),
  danh_muc_ap_dung_id: yup.number(),
  san_pham_ap_dung_id: yup.number(),
  da_su_dung: yup.number(),
  gioi_han_su_dung: yup.number(),
});

export const SaleRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  gia_tri_giam_hd: yup.number(),
  trang_thai_ma_giam_gia: yup.number(),
  loai_giam_gia_hd: yup.number(),
  loai_uu_dai: yup.number(),
  ma_giam_gia: yup.string(),
  mo_ta: yup.string(),
  ngay_bat_dau: yup.string(),
  ngay_ket_thuc: yup.string(),
  so_tien_hoa_don_yeu_cau: yup.number(),
  tieu_de: yup.string(),
  so_luong: yup.number(),
  hang_id: yup.number(),
  chi_tiet_san_pham_id: yup.number(),
  danh_muc_ap_dung_id: yup.number(),
  san_pham_ap_dung_id: yup.number(),
  da_su_dung: yup.number(),
  gioi_han_su_dung: yup.number(),
});

export const SaleResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  gia_tri_giam_hd: yup.number(),
  trang_thai_ma_giam_gia: yup.number(),
  loai_giam_gia_hd: yup.number(),
  loai_uu_dai: yup.number(),
  ma_giam_gia: yup.string(),
  mo_ta: yup.string(),
  ngay_bat_dau: yup.string(),
  ngay_ket_thuc: yup.string(),
  so_tien_hoa_don_yeu_cau: yup.number(),
  tieu_de: yup.string(),
  so_luong: yup.number(),
  hang_id: yup.number(),
  chi_tiet_san_pham_id: yup.number(),
  danh_muc_ap_dung_id: yup.number(),
  san_pham_ap_dung_id: yup.number(),
  da_su_dung: yup.number(),
  gioi_han_su_dung: yup.number(),
});

export const SaleErrorSchema = yup.object({});

export type TSale = yup.InferType<typeof SaleSchema>;

export type SaleResponse = yup.InferType<typeof SaleResponseSchema>;

export type SaleError = yup.InferType<typeof SaleErrorSchema>;
