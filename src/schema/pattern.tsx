import * as yup from "yup";

export const PatternSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  mo_ta: yup.string(),
  ten_hoa_tiet: yup.string(),
});

export const PatternRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  mo_ta: yup.string(),
  ten_hoa_tiet: yup.string(),
});

export const PatternResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  mo_ta: yup.string(),
  ten_hoa_tiet: yup.string(),
});

export const PatternErrorSchema = yup.object({});

export type TPattern = yup.InferType<typeof PatternSchema>;

export type PatternResponse = yup.InferType<typeof PatternResponseSchema>;

export type PatternError = yup.InferType<typeof PatternErrorSchema>;
