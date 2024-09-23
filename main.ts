import { Application } from "@oak/oak";
import router from "./api/v1/router.ts";
import { logger } from "./middleware/logger.ts";
import mongoose from "mongoose";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const app = new Application();

const databaseUrl = Deno.env.get("DATABASE_URL");

if (databaseUrl) {
  await mongoose.connect(
    Deno.env.get("DATABASE_URL")!,
  );
}

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Connection to database ${
      mongoose.connection.readyState === 1 ? "succesfull" : "unsuccesfull"
    }`,
  );
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`,
  );
});

app.use(logger);
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
