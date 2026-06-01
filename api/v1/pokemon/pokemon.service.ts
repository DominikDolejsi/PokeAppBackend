import { Pokemon, PokemonDB, PokemonModel } from "./pokemon.model.ts";
import { DeleteResult, UpdateWriteOpResult } from "mongoose";

export const getManyPokemon = async (): Promise<PokemonDB[]> => {
  const pokemon = await PokemonModel.find({
    name: { $in: [] },
    index: { $in: [] },
    type: { $in: [] },
    category: { $in: [] },
    gender: { $in: [] },
    generation: { $in: [] },
    form: { $in: [] },
  });

  return pokemon;
};

export const getPokemon = async (
  pokemonId: string,
): Promise<PokemonDB | null> => {
  const pokemon = await PokemonModel.findOne({ _id: pokemonId });

  return pokemon;
};

export const createManyPokemon = async (
  newPokemon: Pokemon[],
): Promise<PokemonDB[]> => {
  const createdPokemon = await PokemonModel.insertMany(newPokemon);

  return createdPokemon;
};

export const updatePokemon = async (
  pokemonId: string,
  newPokemon: Partial<Pokemon>,
): Promise<UpdateWriteOpResult> => {
  const updatedPokemon = await PokemonModel.updateOne({
    _id: pokemonId,
  }, newPokemon);

  return updatedPokemon;
};

export const deletePokemon = async (
  pokemonId: string,
): Promise<DeleteResult> => {
  const deletedPokemon = await PokemonModel.deleteOne({ _id: pokemonId });

  return deletedPokemon;
};

export const deleteManyPokemon = async (
  pokemonIds: string[],
): Promise<DeleteResult> => {
  const deletedPokemon = await PokemonModel.deleteMany({
    _id: { $in: pokemonIds },
  });

  return deletedPokemon;
};
