import { Router } from "@oak/oak";
import { PokemonModel } from "../api/v1/pokemon/pokemon.model.ts";
import file from "./pokemon.json" with { type: "json" };

const seedDB = async () => {
    const currentDB = await PokemonModel.find();
    if (currentDB) {
        console.log("Found some documents in DB");
        PokemonModel.deleteMany();
        console.log("Cleard DB");
    }

    const createdPokemon = await PokemonModel.insertMany(file);
};

export const seedlingRouter = new Router({
    prefix: "/seedling",
});

seedlingRouter.get("/", async (ctx, _next) => {
    try {
        await seedDB();
        ctx.response.body = "seeding completed";
    } catch (error) {
        ctx.response.body = `seeding failed ${error}`;
    }
});
