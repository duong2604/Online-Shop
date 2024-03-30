import * as yup from "yup";

export const StrapMaterialSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_chat_lieu_day_deo: yup.string(),
});

export const StrapMaterialRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_chat_lieu_day_deo: yup.string(),
});

export const StrapMaterialResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  ten_chat_lieu_day_deo: yup.string(),
});

export const StrapMaterialErrorSchema = yup.object({});

export type TStrapMaterial = yup.InferType<typeof StrapMaterialSchema>;

export type StrapMaterialResponse = yup.InferType<
  typeof StrapMaterialResponseSchema
>;

export type StrapMaterialError = yup.InferType<typeof StrapMaterialErrorSchema>;
