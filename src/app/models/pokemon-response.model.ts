import { Pokemon } from "./pokemon.model";

export interface PokemonApiResponse {
    next: string;
    results: Pokemon[];
}