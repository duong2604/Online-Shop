import * as yup from "yup";

export const CategorySchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_danh_muc: yup.string(),
  ma_danh_muc: yup.string(),
  is_parent: yup.number(),
});

export const CategoryRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_danh_muc: yup.string(),
  ma_danh_muc: yup.string(),
  is_parent: yup.number(),
});

export const CategoryResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_danh_muc: yup.string(),
  ma_danh_muc: yup.string(),
  is_parent: yup.number(),
});

export const CategoryErrorSchema = yup.object({});

export type TCategory = yup.InferType<typeof CategorySchema>;

export type CategoryResponse = yup.InferType<typeof CategoryResponseSchema>;

export type CategoryError = yup.InferType<typeof CategoryErrorSchema>;
