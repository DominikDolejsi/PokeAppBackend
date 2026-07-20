FROM denoland/deno:2.9.3 AS builder

WORKDIR /app

COPY . .

EXPOSE 8000

CMD ["deno", "task", "start"]
