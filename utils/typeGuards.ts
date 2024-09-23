import { isHttpError } from "@oak/oak";

export const isInvalidOrEmptyJSONBodyError = (error: unknown): boolean => {
    return isHttpError(error) &&
        error.message === "Unexpected end of JSON input";
};
