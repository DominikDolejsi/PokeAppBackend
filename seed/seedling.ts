import { PokemonModel } from "../api/v1/pokemon/pokemon.model.ts";
import file from "./pokemon.json" with { type: "json" };

const seedDB = async () => {
    try {
        const currentDB = await PokemonModel.find();
        if (!currentDB) {
            console.log("Found some documents in DB");
            PokemonModel.deleteMany();
            console.log("Cleard DB");
        }

        const createdPokemon = await PokemonModel.insertMany(file);

        console.log(`Seed database with new data ${createdPokemon}`);
    } catch (error) {
        console.log(`Error while seeding ${error}`);
    }
};

await seedDB();
