import * as yup from "yup";

export const NewsSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  title: yup.string(),
  image: yup.string(),
  content: yup.string(),
});

export const NewsRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  title: yup.string(),
  image: yup.string(),
  content: yup.string(),
});

export const NewsResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  title: yup.string(),
  image: yup.string(),
  content: yup.string(),
});

export const NewsErrorSchema = yup.object({});

export type TNews = yup.InferType<typeof NewsSchema>;

export type NewsResponse = yup.InferType<typeof NewsResponseSchema>;

export type NewsError = yup.InferType<typeof NewsErrorSchema>;
