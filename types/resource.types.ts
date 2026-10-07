export const POKEMON_TYPE = {
  fire: "fire",
  water: "water",
  grass: "grass",
  poison: "poison",
  normal: "normal",
  rock: "rock",
  ground: "ground",
  flying: "flying",
  psychic: "psychic",
  ghost: "ghost",
  fighting: "fighting",
  electric: "electric",
  fairy: "fairy",
  steel: "steel",
  dark: "dark",
  dragon: "dragon",
  ice: "ice",
  bug: "bug",
} as const;

export type PokemonType = keyof typeof POKEMON_TYPE;
