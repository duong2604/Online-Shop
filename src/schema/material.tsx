import * as yup from "yup";

export const MaterialSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  mo_ta: yup.string(),
  ten_chat_lieu: yup.string(),
});

export const MaterialRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  mo_ta: yup.string(),
  ten_chat_lieu: yup.string(),
});

export const MaterialResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  mo_ta: yup.string(),
  ten_chat_lieu: yup.string(),
});

export const MaterialErrorSchema = yup.object({});

export type TMaterial = yup.InferType<typeof MaterialSchema>;

export type MaterialResponse = yup.InferType<typeof MaterialResponseSchema>;

export type MaterialError = yup.InferType<typeof MaterialErrorSchema>;
