FROM denoland/deno:2.0.4 AS builder

WORKDIR /app

COPY . .

RUN deno task compile

FROM debian:bullseye-slim

COPY --from=builder /app/server .

EXPOSE 8000

CMD [ "./server" ]
