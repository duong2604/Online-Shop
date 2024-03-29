import * as yup from "yup";

export const BrandSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_thuong_hieu: yup.string(),
});

export const BrandRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_thuong_hieu: yup.string(),
});

export const BrandResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_thuong_hieu: yup.string(),
});

export const BrandErrorSchema = yup.object({});

export type TBrand = yup.InferType<typeof BrandSchema>;

export type BrandResponse = yup.InferType<typeof BrandResponseSchema>;

export type BrandError = yup.InferType<typeof BrandErrorSchema>;
