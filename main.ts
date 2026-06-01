import { Application } from "@oak/oak";
import router from "./api/v1/router.ts";
import { logger } from "./middleware/logger.ts";
import mongoose from "mongoose";
import { oakCors } from "cors";

const app = new Application();

const databaseUrl = Deno.env.get("DATABASE_URL");

if (databaseUrl) {
  await mongoose.connect(databaseUrl);
}

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Connection to database ${
      mongoose.connection.readyState === 1 ? "successful" : "unsuccessful"
    }
    Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}
    `,
  );
});

app.use(logger);
app.use(oakCors({
  origin: "https://pokeappfrontend-dev.up.railway.app",
}));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
