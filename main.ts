import { Application } from "@oak/oak";
import router from "./api/v1/router.ts";
import { logger } from "./middleware/logger.ts";
import mongoose from "mongoose";

const app = new Application();

await mongoose.connect(
  Deno.env.get("DATABASE_URL") ?? "mongodb://localhost:27017",
);

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(`This is a env variable ${Deno.env.get("DATABASE_URL")}`);
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

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
