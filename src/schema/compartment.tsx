import * as yup from "yup";

export const CompartmentSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_so_ngan: yup.string(),
});

export const CompartmentRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_so_ngan: yup.string(),
});

export const CompartmentResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_so_ngan: yup.string(),
});

export const CompartmentErrorSchema = yup.object({});

export type TCompartment = yup.InferType<typeof CompartmentSchema>;

export type CompartmentResponse = yup.InferType<
  typeof CompartmentResponseSchema
>;

export type CompartmentError = yup.InferType<typeof CompartmentErrorSchema>;
