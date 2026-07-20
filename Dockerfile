FROM denoland/deno:2.9.3 AS builder

EXPOSE 8000

WORKDIR /app

USER deno

COPY . .

RUN deno cache main.ts

CMD ["deno", "task", "start"]
