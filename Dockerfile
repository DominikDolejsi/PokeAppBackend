FROM denoland/deno:1.46.2

EXPOSE 8000

WORKDIR /AppBackend

USER deno

COPY . .

RUN deno cache main.ts

CMD ["deno", "task", "start"]