import { Router } from "@oak/oak";
import { getAllController } from "./pokemon.controller.ts";

const pokemonRouter = new Router({
    prefix: "/pokemon",
});

pokemonRouter.get("/", getAllController);

pokemonRouter.get("/hello", (ctx) => {
    ctx.response.body = "Hello world";
});

export default pokemonRouter;
