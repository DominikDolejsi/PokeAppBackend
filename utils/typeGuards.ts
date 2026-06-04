import { POKEMON_TYPE, PokemonType } from "../types/resource.types.ts";

export const isPokemonType = (value: string): value is PokemonType => {
  return Object.values(POKEMON_TYPE).includes(value as PokemonType);
};
