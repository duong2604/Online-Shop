import * as yup from "yup";

export const BillSchema = yup.object().shape({
  id: yup.number(),
  ghi_chu: yup.string(),
  hinh_thuc_mua_hang: yup.number(),
  hinh_thuc_thanh_toan: yup.number(),
  ma_hoa_don: yup.string(),
  ngay_lap: yup.string(),
  phi_ship: yup.number(),
  tien_giam_ship: yup.number(),
  tong_tien_duoc_giam_event: yup.number(),
  tong_tien_duoc_giam_voucher: yup.number(),
  tong_tien_tam_tinh: yup.number(),
  tong_tien_thanh_toan: yup.number(),
  trang_thai_hoa_don: yup.number(),
  dia_chi_id: yup.number(),
  khach_hang_id: yup.number(),
  nhan_vien_id: yup.number(),
  nhan_duoc_tien: yup.number(),
  da_thanh_toan: yup.number(),
  nhan_vien_xac_nhan_id: yup.number(),
});

export const BillRequestSchema = yup.object().shape({
  id: yup.number(),
  ghi_chu: yup.string(),
  hinh_thuc_mua_hang: yup.number(),
  hinh_thuc_thanh_toan: yup.number(),
  ma_hoa_don: yup.string(),
  ngay_lap: yup.string(),
  phi_ship: yup.number(),
  tien_giam_ship: yup.number(),
  tong_tien_duoc_giam_event: yup.number(),
  tong_tien_duoc_giam_voucher: yup.number(),
  tong_tien_tam_tinh: yup.number(),
  tong_tien_thanh_toan: yup.number(),
  trang_thai_hoa_don: yup.number(),
  dia_chi_id: yup.number(),
  khach_hang_id: yup.number(),
  nhan_vien_id: yup.number(),
  nhan_duoc_tien: yup.number(),
  da_thanh_toan: yup.number(),
  nhan_vien_xac_nhan_id: yup.number(),
});

export const BillResponseSchema = yup.object().shape({
  id: yup.number(),
  ghi_chu: yup.string(),
  hinh_thuc_mua_hang: yup.number(),
  hinh_thuc_thanh_toan: yup.number(),
  ma_hoa_don: yup.string(),
  ngay_lap: yup.string(),
  phi_ship: yup.number(),
  tien_giam_ship: yup.number(),
  tong_tien_duoc_giam_event: yup.number(),
  tong_tien_duoc_giam_voucher: yup.number(),
  tong_tien_tam_tinh: yup.number(),
  tong_tien_thanh_toan: yup.number(),
  trang_thai_hoa_don: yup.number(),
  dia_chi_id: yup.number(),
  khach_hang_id: yup.number(),
  nhan_vien_id: yup.number(),
  nhan_duoc_tien: yup.number(),
  da_thanh_toan: yup.number(),
  nhan_vien_xac_nhan_id: yup.number(),
});

export const BillErrorSchema = yup.object({});

export type TBill = yup.InferType<typeof BillSchema>;

export type BillResponse = yup.InferType<typeof BillResponseSchema>;

export type BillError = yup.InferType<typeof BillErrorSchema>;
