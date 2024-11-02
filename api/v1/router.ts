import { Router } from "@oak/oak";
import pokemonRouter from "./pokemon/pokemon.router.ts";
import { seedlingRouter } from "../../seed/seedling.ts";

const router = new Router();

router.use(pokemonRouter.routes());
router.use(pokemonRouter.allowedMethods());
router.use(seedlingRouter.routes());
router.use(seedlingRouter.allowedMethods());

export default router;
