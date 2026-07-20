FROM denoland/deno:2.8.1 AS builder

WORKDIR /app

EXPOSE 8000

RUN deno task start
