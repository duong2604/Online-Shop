import * as yup from "yup";

export const LockTypeSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_kieu_khoa: yup.string(),
});

export const LockTypeRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_kieu_khoa: yup.string(),
});

export const LockTypeResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_kieu_khoa: yup.string(),
});

export const LockTypeErrorSchema = yup.object({});

export type TLockType = yup.InferType<typeof LockTypeSchema>;

export type LockTypeResponse = yup.InferType<typeof LockTypeResponseSchema>;

export type LockTypeError = yup.InferType<typeof LockTypeErrorSchema>;
