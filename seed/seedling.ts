import { Router } from "@oak/oak";
import { PokemonModel } from "../api/v1/pokemon/pokemon.model.ts";
import file from "./pokemon.json" with { type: "json" };

const seedDB = async () => {
    await PokemonModel.find();
    await PokemonModel.deleteMany();
    await PokemonModel.insertMany(file);
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
