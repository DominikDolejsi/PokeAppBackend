import { model, Schema } from "mongoose";

export type Pokemon = {
    name: string;
    nationalIndex: number;
};

const pokemonSchema = new Schema({
    name: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const pokemonModel = model("Pokemon", pokemonSchema);
