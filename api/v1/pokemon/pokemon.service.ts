import { pokemonModel } from "./pokemon.model.ts";

export const getAllPokemon = async () => {
  const allPokemon = await pokemonModel.find();

  console.log(`These are the pokemon I found ${allPokemon}`);

  return allPokemon;
};
