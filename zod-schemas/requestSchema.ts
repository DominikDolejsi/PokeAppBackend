import { z } from "@zod/zod";
import { Pokemon } from "../api/v1/pokemon/pokemon.model.ts";

export const universalSchema = z.object({
    body: z.object({
        name: z.string(),
        age: z.number(),
    }),
});

export const getOneSchema = z.object({
    params: z.object({
        pokemonId: z.string(),
    }),
});

export const createManySchema = z.object({
    body: Pokemon.array(),
});

export const deleteOneSchema = z.object({
    params: z.object({
        pokemonId: z.string(),
    }),
});
