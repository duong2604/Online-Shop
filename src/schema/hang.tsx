import * as yup from "yup";

export const HangSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_hang: yup.string(),
  ma_hang: yup.string(),
});

export const HangRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_hang: yup.string(),
  ma_hang: yup.string(),
});

export const HangResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_hang: yup.string(),
  ma_hang: yup.string(),
});

export const HangErrorSchema = yup.object({});

export type THang = yup.InferType<typeof HangSchema>;

export type HangResponse = yup.InferType<typeof HangResponseSchema>;

export type HangError = yup.InferType<typeof HangErrorSchema>;
