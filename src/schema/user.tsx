import * as yup from "yup";

export const UserSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  user_name: yup.string(),
  email: yup.string(),
  password: yup.string(),
});

export const UserRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  user_name: yup.string(),
  email: yup.string(),
  password: yup.string(),
});

export const UserResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  user_name: yup.string(),
  email: yup.string(),
  password: yup.string(),
});

export const UserErrorSchema = yup.object({});

export type TUser = yup.InferType<typeof UserSchema>;

export type UserResponse = yup.InferType<typeof UserResponseSchema>;

export type UserError = yup.InferType<typeof UserErrorSchema>;
