import { z } from "@zod/zod";
import { model, Schema, Types } from "mongoose";
import { isPokemonType } from "../../../utils/typeGuards.ts";

// NOTE: Schema and Zod Object need to be in sync

export const Pokemon = z.object({
  name: z.string().min(1),
  index: z.number().gte(1),
  category: z.string(),
  form: z.nullable(z.string()),
  gender: z.number().refine((val) => [0, 1, 2, 3].includes(val), {
    message: "Gender indicator isnt one of [0, 1, 2, 3]",
  }),
  generation: z.number().gte(1),
  type: z.array(
    z.string().refine((val: string) => isPokemonType(val), {
      message: "Pokemon type is not one of predefined types",
    }),
  ).min(1)
    .max(2),
  flavor_text: z.array(z.string()).min(1).max(2),
  next_evolution: z.nullable(z.array(z.string().min(1)).min(1)),
  artwork: z.string(),
  home_sprite: z.nullable(z.string()),
  home_sprite_shiny: z.nullable(z.string()),
  home_sprite_female: z.nullable(z.string()),
  home_sprite_female_shiny: z.nullable(z.string()),
});

export const PokemonDB = Pokemon.extend({
  _id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Pokemon = z.infer<typeof Pokemon>;
export type PokemonDB = z.infer<typeof PokemonDB>;

const pokemonSchema = new Schema<PokemonDB>({
  name: { type: String, required: true },
  index: { type: Number, required: true, min: 1 },
  category: { type: String, required: true },
  form: { type: String, default: null },
  gender: { type: Number, required: true, enum: [0, 1, 2, 3] },
  generation: { type: Number, required: true, min: 1 },
  type: { type: [String], required: true },
  flavor_text: { type: [String], required: true },
  next_evolution: { type: [Types.ObjectId], default: null, ref: "Pokemon" },
  artwork: { type: String, required: true },
  home_sprite: { type: String, default: null },
  home_sprite_shiny: { type: String, default: null },
  home_sprite_female: { type: String, default: null },
  home_sprite_female_shiny: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const PokemonModel = model<PokemonDB>("Pokemon", pokemonSchema);
