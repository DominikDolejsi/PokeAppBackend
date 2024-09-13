import { isHttpError, Middleware } from "@oak/oak";

export const errorHandler: Middleware = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        if (isHttpError(error)) {
            ctx.response.status = error.status;
        }
        ctx.response.type = "json";
        ctx.response.body = { error: error?.message };
    }
};
