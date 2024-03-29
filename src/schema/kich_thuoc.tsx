import * as yup from "yup";

export const SizeeSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  chieu_cao: yup.string(),
  chieu_dai: yup.string(),
  chieu_rong: yup.string(),
  kich_co_id: yup.number(),
});

export const SizeeRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  chieu_cao: yup.string(),
  chieu_dai: yup.string(),
  chieu_rong: yup.string(),
  kich_co_id: yup.number(),
});

export const SizeeResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  chieu_cao: yup.string(),
  chieu_dai: yup.string(),
  chieu_rong: yup.string(),
  kich_co_id: yup.number(),
});

export const SizeeErrorSchema = yup.object({});

export type TSizee = yup.InferType<typeof SizeeSchema>;

export type SizeeResponse = yup.InferType<typeof SizeeResponseSchema>;

export type SizeeError = yup.InferType<typeof SizeeErrorSchema>;
