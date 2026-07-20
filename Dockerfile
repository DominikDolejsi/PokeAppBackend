FROM denoland/deno:2.8.1 AS builder

EXPOSE 8000

RUN deno task start
