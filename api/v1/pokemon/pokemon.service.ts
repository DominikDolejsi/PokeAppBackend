import { getManySearchParams } from "../../../zod-schemas/requestSchema.ts";
import { Pokemon, PokemonDB, PokemonModel } from "./pokemon.model.ts";
import { DeleteResult, UpdateWriteOpResult } from "mongoose";

export const getManyPokemon = async (
  { limit, skip, sort, select, populate }: getManySearchParams,
): Promise<PokemonDB[]> => {
  const pokemon = await PokemonModel.find().skip(skip).limit(limit).sort(sort)
    .select(select).populate({
      path: populate ? "next_evolution" : "index",
      populate: { path: populate ? "next_evolution" : "index" },
    });

  return pokemon;
};

export const getPokemon = async (
  pokemonId: string,
  populate: boolean,
): Promise<PokemonDB | null> => {
  const pokemon = await PokemonModel.findOne({ _id: pokemonId }).populate({
    path: populate ? "next_evolution" : "index",
    populate: { path: populate ? "next_evolution" : "index" },
  });

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
