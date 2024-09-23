import { Pokemon, PokemonModel } from "./pokemon.model.ts";

export const getAllPokemon = async () => {
  const allPokemon = await PokemonModel.find();

  return allPokemon;
};

export const getOnePokemon = async (pokemonId: string) => {
  const pokemon = await PokemonModel.findOne({ _id: pokemonId });

  return pokemon;
};

export const createManyPokemon = async (newPokemon: Pokemon[]) => {
  const createdPokemon = await PokemonModel.insertMany(newPokemon);

  return createdPokemon;
};

export const deletOnePokemon = async (pokemonId: string) => {
  const deletedPokemon = await PokemonModel.deleteOne({ _id: pokemonId });

  return deletedPokemon;
};
