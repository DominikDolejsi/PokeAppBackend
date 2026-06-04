export const POKEMON_TYPE = {
  Fire: "Fire",
  Water: "Water",
  Grass: "Grass",
  Poison: "Poison",
  Normal: "Normal",
  Rock: "Rock",
  Ground: "Ground",
  Flying: "Flying",
  Psychic: "Psychic",
  Ghost: "Ghost",
  Fighting: "Fighting",
  Electric: "Electric",
  Fairy: "Fairy",
  Steel: "Steel",
  Dark: "Dark",
  Dragon: "Dragon",
  Ice: "Ice",
  Bug: "Bug",
} as const;

export type PokemonType = keyof typeof POKEMON_TYPE;
