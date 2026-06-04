import { z } from "@zod/zod";
import { Pokemon } from "../api/v1/pokemon/pokemon.model.ts";

export const universalSchema = z.object({
  body: z.object({
    name: z.string(),
    age: z.number(),
  }),
});

const getManySearchParamsSchema = z.object({
  limit: z.coerce.number().default(25),
  sort: z.string().min(1).default("index"),
  skip: z.coerce.number().default(0),
  select: z.string().default(""),
  populate: z.coerce.boolean().default(false),
});

export const getManyPokemonSchema = z.object({
  searchParams: getManySearchParamsSchema,
});

export type getManySearchParams = z.infer<typeof getManySearchParamsSchema>;

export const getOneSchema = z.object({
  params: z.object({
    pokemonId: z.string(),
  }),
  searchParams: z.object({
    populate: z.coerce.boolean().default(false),
  }),
});

export const createManyPokemonSchema = z.object({
  body: Pokemon.array(),
});

export const updatePokemonSchema = z.object({
  params: z.object({
    pokemonId: z.string(),
  }),
  body: Pokemon.partial(),
});

export const deleteOneSchema = z.object({
  params: z.object({
    pokemonId: z.string(),
  }),
});

export const deleteManyPokemonSchema = z.object({
  body: z.object({
    pokemonIds: z.array(z.string()).min(1),
  }),
});
