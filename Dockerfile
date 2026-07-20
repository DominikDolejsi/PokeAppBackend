FROM denoland/deno:2.8.1 AS builder

WORKDIR /app

COPY . .

EXPOSE 8000

CMD ["deno", "task", "start"]
