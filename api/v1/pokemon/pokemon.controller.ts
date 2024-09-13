import { RouterMiddleware } from "@oak/oak";
import { getAllPokemon } from "./pokemon.service.ts";

export const getAllController: RouterMiddleware<"/"> = async (
  ctx,
  _next,
) => {
  // here you should getAll of them, I will need middleware for parsing the ctx.request

  try {
    // first parse the ctx
    // what should I parse ??
    // body, search params, has, url params like :id

    // then call the service for allPokemon
    const pokemon = await getAllPokemon();

    ctx.response.type = "json";
    ctx.response.body = pokemon;
  } catch (_error: unknown) {
    //then error handling ???
  }
};
