import * as yup from "yup";

export const CommentStatusSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  comment_status_name: yup.string(),
});

export const CommentStatusRequestSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  comment_status_name: yup.string(),
});

export const CommentStatusResponseSchema = yup.object().shape({
  id: yup.number(),
  create_date: yup.string(),
  update_date: yup.string(),
  comment_status_name: yup.string(),
});

export const CommentStatusErrorSchema = yup.object({});

export type TCommentStatus = yup.InferType<typeof CommentStatusSchema>;

export type CommentStatusResponse = yup.InferType<
  typeof CommentStatusResponseSchema
>;

export type CommentStatusError = yup.InferType<typeof CommentStatusErrorSchema>;
