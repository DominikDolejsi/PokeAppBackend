import { HttpError, Middleware } from "@oak/oak";
import { STATUS_CODE } from "@oak/commons/status";
import { NotFoundError } from "../types/error.types.ts";
import { ZodError } from "@zod/zod";
import { MongooseError } from "mongoose";

export const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof MongooseError) {
      ctx.response.type = "json";
      ctx.response.body = { errorMessage: error.message };
    }

    if (error instanceof HttpError) {
      ctx.response.status = error.status;
      ctx.response.type = "json";
      ctx.response.body = { errorMessage: error.message };
    }

    if (error instanceof NotFoundError) {
      ctx.response.status = STATUS_CODE.NotFound;
      ctx.response.type = "json";
      ctx.response.body = { errorMessage: error.message };
    }

    if (error instanceof ZodError) {
      ctx.response.status = STATUS_CODE.BadRequest;
      ctx.response.type = "json";
      ctx.response.body = {
        errorIssue: error.issues,
      };
    }
  }
};
