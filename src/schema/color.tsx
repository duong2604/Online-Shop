import * as yup from "yup";

export const ColorSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_mau: yup.string(),
  ma_mau: yup.string(),
});

export const ColorRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_mau: yup.string(),
  ma_mau: yup.string(),
});

export const ColorResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_mau: yup.string(),
  ma_mau: yup.string(),
});

export const ColorErrorSchema = yup.object({});

export type TColor = yup.InferType<typeof ColorSchema>;

export type ColorResponse = yup.InferType<typeof ColorResponseSchema>;

export type ColorError = yup.InferType<typeof ColorErrorSchema>;
