import { RouterMiddleware } from "@oak/oak";
import {
  createManyPokemon,
  deleteManyPokemon,
  deletePokemon,
  getManyPokemon,
  getPokemon,
  updatePokemon,
} from "./pokemon.service.ts";
import { zParse } from "../../../utils/zParse.ts";
import {
  createManyPokemonSchema,
  deleteManyPokemonSchema,
  deleteOneSchema,
  getManyPokemonSchema,
  getOneSchema,
  universalSchema,
  updatePokemonSchema,
} from "../../../zod-schemas/requestSchema.ts";
import { NotFoundError } from "../../../types/error.types.ts";

export const getAllController: RouterMiddleware<"/"> = async (
  ctx,
  _next,
) => {
  const { searchParams } = await zParse(getManyPokemonSchema, {
    searchParams: Object.fromEntries(ctx.request.url.searchParams),
  });

  const pokemon = await getManyPokemon(searchParams);

  if (pokemon.length === 0) throw new NotFoundError("Pokemon not found");

  ctx.response.type = "json";
  ctx.response.body = pokemon;
};

export const getOneController: RouterMiddleware<"/:pokemonId"> = async (
  ctx,
  _next,
) => {
  const { params, searchParams } = await zParse(getOneSchema, {
    params: ctx.params,
    searchParams: Object.fromEntries(ctx.request.url.searchParams),
  });

  const pokemon = await getPokemon(params.pokemonId, searchParams.populate);

  if (!pokemon) throw new NotFoundError("Pokemon not found");

  ctx.response.type = "json";
  ctx.response.body = pokemon;
};

export const createManyController: RouterMiddleware<"/"> = async (
  ctx,
  _next,
) => {
  const requestBody = await ctx.request.body.json(); // parse it

  const { body } = await zParse(createManyPokemonSchema, { body: requestBody });

  const pokemon = await createManyPokemon(body);

  ctx.response.type = "json";
  ctx.response.body = pokemon;
};

export const updateOneController: RouterMiddleware<"/:pokemonId"> = async (
  ctx,
  _next,
) => {
  const requestBody = await ctx.request.body.json(); // parse it

  const { params, body } = await zParse(updatePokemonSchema, {
    params: ctx.params,
    body: requestBody,
  });

  const pokemon = await updatePokemon(params.pokemonId, body);

  ctx.response.type = "json";
  ctx.response.body = pokemon;
};

export const deleteOneController: RouterMiddleware<"/:pokemonId"> = async (
  ctx,
  _next,
) => {
  // const RequestSearchParams = Object.fromEntries(
  //   ctx.request.url.searchParams,
  // );

  const { params } = await zParse(deleteOneSchema, { params: ctx.params });

  const pokemon = await deletePokemon(params.pokemonId);

  ctx.response.type = "json";
  ctx.response.body = pokemon;
};

export const deleteManyController: RouterMiddleware<"/"> = async (
  ctx,
  _next,
) => {
  const requestBody = await ctx.request.body.json();

  const { body } = await zParse(deleteManyPokemonSchema, {
    body: requestBody,
  });

  const pokemon = await deleteManyPokemon(body.pokemonIds);

  ctx.response.type = "json";
  ctx.response.body = pokemon;
};

export const universalController: RouterMiddleware<"/item"> = async (
  ctx,
  _next,
) => {
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
};
