import { Router } from "@oak/oak";
import {
  createManyController,
  deleteManyController,
  deleteOneController,
  getAllController,
  getOneController,
  updateOneController,
} from "./pokemon.controller.ts";

const pokemonRouter = new Router({
  prefix: "/pokemon",
});

pokemonRouter.get("/", getAllController)
  .get("/:pokemonId", getOneController)
  .post("/", createManyController)
  // .patch("/:pokemonId", updateOneController)
  // .delete("/", deleteManyController);
  .delete("/:pokemonId", deleteOneController);

export default pokemonRouter;
