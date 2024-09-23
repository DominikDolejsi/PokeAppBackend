import { AnyZodObject, z } from "@zod/zod";

type JSONValue = string | number | boolean | null | JSONValue[] | {
  [key: string]: JSONValue;
};
type JSONObject = Record<string, JSONValue>;

export type ParseableData = {
  params?: Record<string | number, string | undefined>;
  searchParams?: Record<string, string>;
  body?: Record<string, JSONObject>;
};

export const zParse = async <T extends AnyZodObject>(
  schema: T,
  { params, searchParams, body }: ParseableData,
): Promise<z.infer<T>> => {
  return await schema.parseAsync({
    params,
    searchParams,
    body,
  });
};
