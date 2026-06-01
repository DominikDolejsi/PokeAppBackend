import { RouterMiddleware } from "@oak/oak";
import { STATUS_CODE } from "@oak/commons/status";
import {
  createManyPokemon,
  createPokemon,
  getManyPokemon,
} from "./pokemon.service.ts";
import { zParse } from "../../../utils/zParse.ts";
import {
  createManySchema,
  createPokemonSchema,
  deleteOneSchema,
  getOneSchema,
  universalSchema,
} from "../../../zod-schemas/requestSchema.ts";
import { ZodObject } from "@zod/zod";

export const getAllController: RouterMiddleware<"/"> = async (
  ctx,
  _next,
) => {
  try {
    // get data
    // parse data
    // call service
    // send response
    // handle errors
    // send response
    const searchParams = Object.fromEntries(ctx.request.url.searchParams); // gotta parse it

    const pokemon = await getManyPokemon();

    ctx.response.body = pokemon;
  } catch (error) {
    if (error instanceof Error) {
      ctx.response.body = { errorMessage: error.message };
    }
    ctx.response.body = { errorMessage: "unknown error" };
  } finally {
    ctx.response.type = "json";
  }
};

export const getOneController: RouterMiddleware<"/:pokemonId"> = async (
  ctx,
  _next,
) => {
  try {
    // get data
    // parse data
    // call service
    // send response
    // handle errors
    // send response
    const searchParams = Object.fromEntries(ctx.request.url.searchParams); // gotta parse it

    const { params } = await zParse(getOneSchema, { params: ctx.params });

    const pokemon = await getOnePokemon(params?.pokemonId);

    ctx.response.type = "json";
    ctx.response.body = pokemon;
  } catch (error: unknown) {
    ctx.response.type = "json";
    if (error instanceof Error) {
      ctx.response.body = { errorMessage: error.message };
    }
    ctx.response.body = { errorMessage: "unknown error" };
  }
};

export const createManyController: RouterMiddleware<"/"> = async (
  ctx,
  _next,
) => {
  try {
    const requestBody = await ctx.request.body.json(); // parse it¨

    const { body } = await zParse(createManySchema, { body: requestBody });

    const pokemon = await createManyPokemon(body);

    ctx.response.type = "json";
    ctx.response.body = pokemon;
  } catch (error: unknown) {
    console.log("Error", error);

    ctx.response.status = STATUS_CODE.BadRequest;
    if (isInvalidOrEmptyJSONBodyError(error)) {
      ctx.response.type = "json";
      ctx.response.body = { errorMessage: "Invalid or Empty body" };
    }
    ctx.response.body = { errorMessage: "unknown error" };
  }
};

export const updateOneController: RouterMiddleware<"/:pokemonId"> = async (
  ctx,
  _next,
) => {
  try {
    const pokemon = await getAllPokemon();

    ctx.response.type = "json";
    ctx.response.body = pokemon;
  } catch (_error: unknown) {
    //then error handling ???
  }
};

export const deleteOneController: RouterMiddleware<"/:pokemonId"> = async (
  ctx,
  _next,
) => {
  try {
    const RequestSearchParams = Object.fromEntries(
      ctx.request.url.searchParams,
    );

    const { params } = await zParse(deleteOneSchema, { params: ctx.params });

    const pokemon = await deletOnePokemon(params?.pokemonId);

    ctx.response.type = "json";
    ctx.response.body = pokemon;
  } catch (error: unknown) {
    ctx.response.type = "json";
    console.log("Error", error);
    if (error instanceof Error) {
      ctx.response.body = { errorMessage: error.message };
    }
    ctx.response.body = { errorMessage: "unknown error" };
  }
};

export const deleteManyController: RouterMiddleware<"/:pokemonId"> = async (
  ctx,
  _next,
) => {
  try {
    const pokemon = await getAllPokemon();

    ctx.response.type = "json";
    ctx.response.body = pokemon;
  } catch (_error: unknown) {
    //then error handling ???
  }
};

export const universalController: RouterMiddleware<"/item"> = async (
  ctx,
  _next,
) => {
  try {
    const requestBody = await ctx.request.body.json();

    const { body } = await zParse(universalSchema, {
      body: requestBody,
    });

    console.log(body);
    ctx.response.body = { status: "successfuly parsed" };

    console.log("searchParams");
    console.log(Object.fromEntries(ctx.request.url.searchParams));
    console.log("params");
    console.log(ctx.params);
    ctx.request.hasBody;
  } catch (error: unknown) {
    console.log(error);
  }
};
