import { Router } from "@oak/oak";
import pokemonRouter from "./pokemon/pokemon.router.ts";

const router = new Router();

router.use(pokemonRouter.routes());
router.use(pokemonRouter.allowedMethods());

export default router;
