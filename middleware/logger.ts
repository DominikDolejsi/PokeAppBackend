import { Middleware } from "@oak/oak";
import * as colors from "@std/fmt/colors";

export const logger: Middleware = async (ctx, next) => {
    await next();
    const c = ctx.response.status >= 500
        ? colors.red
        : ctx.response.status >= 400
        ? colors.yellow
        : colors.green;
    console.log(
        `${c(ctx.request.method)} ${c(`(${ctx.response.status})`)} - ${
            colors.rgb8(
                `${ctx.request.url.pathname}${ctx.request.url.search}`,
                72,
            )
        }`,
    );
};
