import * as yup from "yup";

export const ProductTypeSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_loai: yup.string(),
  ma_loai: yup.string(),
});

export const ProductTypeRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_loai: yup.string(),
  ma_loai: yup.string(),
});

export const ProductTypeResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_loai: yup.string(),
  ma_loai: yup.string(),
});

export const ProductTypeErrorSchema = yup.object({});

export type TProductType = yup.InferType<typeof ProductTypeSchema>;

export type ProductTypeResponse = yup.InferType<
  typeof ProductTypeResponseSchema
>;

export type ProductTypeError = yup.InferType<typeof ProductTypeErrorSchema>;
