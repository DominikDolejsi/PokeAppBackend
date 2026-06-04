import { Application } from "@oak/oak";
import router from "./api/v1/router.ts";
import { logger } from "./middleware/logger.ts";
import mongoose from "mongoose";
import { oakCors } from "cors";
import { errorHandler } from "./middleware/errorHandler.ts";

const app = new Application();

const databaseUrl = Deno.env.get("DATABASE_URL");
const serverPort = Number(Deno.env.get("PORT"));
const allowedOrigins = Deno.env.get("CORS");

console.log(databaseUrl);
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
app.use(errorHandler);
app.use(oakCors({
  origin: allowedOrigins,
}));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: serverPort });
