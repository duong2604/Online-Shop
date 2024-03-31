import * as yup from "yup";

export const ContactSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ho_ten: yup.string(),
  email: yup.string(),
  so_dien_thoai: yup.string(),
  noi_dung: yup.string(),
});

export const ContactRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ho_ten: yup.string(),
  email: yup.string(),
  so_dien_thoai: yup.string(),
  noi_dung: yup.string(),
});

export const ContactResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ho_ten: yup.string(),
  email: yup.string(),
  so_dien_thoai: yup.string(),
  noi_dung: yup.string(),
});

export const ContactErrorSchema = yup.object({});

export type TContact = yup.InferType<typeof ContactSchema>;

export type ContactResponse = yup.InferType<typeof ContactResponseSchema>;

export type ContactError = yup.InferType<typeof ContactErrorSchema>;
