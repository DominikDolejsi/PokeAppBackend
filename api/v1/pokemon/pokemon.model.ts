import { z } from "@zod/zod";
import { model, Schema } from "mongoose";

const pokemonSchema = new Schema({
  name: { type: String, unique: true },
  artwork: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const PokemonModel = model("Pokemon", pokemonSchema);

export const Pokemon = z.object({
  name: z.string(),
  artwork: z.string(),
});

export const PokemonDB = Pokemon.extend({
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Pokemon = z.infer<typeof Pokemon>;
export type PokemonDB = z.infer<typeof PokemonDB>;
