import { Context } from "@oak/oak";
import { AnyZodObject, z } from "@zod/zod";

export const zParse = async <T extends AnyZodObject>(
    schema: T,
    ctx: Context,
): Promise<z.infer<T>> => {
    return await schema.parseAsync(ctx);
};
