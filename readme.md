# PokeApp Backend ⚙️

The backend service for the Pokémon App. It exposes a REST API used by the frontend and is responsible for authentication, user management, collection management, and serving Pokémon data from the database.

## Project Architecture

This repository is part of a larger Pokémon application split into several
repositories. The project follows a clear separation of responsibilities, where
each repository focuses on a single concern.

- [Frontend 💅](https://github.com/DominikDolejsi/PokeAppFrontend)
- **Backend ⚙️** <- you are here
- [Crawdaunt 🦞](https://github.com/DominikDolejsi/PokeAppCrawdaunt)
- [Images 🖼️](https://github.com/DominikDolejsi/PokeAppImages)

## Instalation

```bash
git clone

cd appBackend

deno install

deno task configure (for Lefthook)
```

## Usage

```bash
deno task start
```

## Tech Stack

- Deno
- Oak
- Zod
- Mongoose
- Lefthook
