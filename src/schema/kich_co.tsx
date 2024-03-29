import * as yup from "yup";

export const SizeSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_kich_co: yup.string(),
});

export const SizeRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_kich_co: yup.string(),
});

export const SizeResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_kich_co: yup.string(),
});

export const SizeErrorSchema = yup.object({});

export type TSize = yup.InferType<typeof SizeSchema>;

export type SizeResponse = yup.InferType<typeof SizeResponseSchema>;

export type SizeError = yup.InferType<typeof SizeErrorSchema>;
