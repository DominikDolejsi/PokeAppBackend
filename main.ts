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

console.log("Started the server");
console.log("databaseUrl :", databaseUrl);
console.log("databaseUrl json:", JSON.stringify(databaseUrl));

if (databaseUrl) {
  try {
    const url = new URL(databaseUrl);

    console.log("URL again :");
    console.log({
      protocol: url.protocol,
      username: url.username,
      host: url.host,
      database: url.pathname,
      authSource: url.searchParams.get("authSource"),
    });
    await mongoose.connect(databaseUrl);
  } catch (error) {
    console.error(error);

    console.dir(error, { depth: null });

    Deno.exit(1);
  }
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
