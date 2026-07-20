FROM denoland/deno:2.8.1 AS builder

WORKDIR /app

COPY . .

RUN deno task start

EXPOSE 8000
