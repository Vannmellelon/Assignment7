import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PokemonApiResponse } from "../models/pokemon-response.model";
import { Pokemon } from "../models/pokemon.model";

const { apiPokemon, apiPokemonDW, apiPokemonAnimated, apiPokemonNotAnimated } = environment;

@Injectable({
    providedIn: "root"
})
export class PokemonCatalogueService {

    private _pokemon: Pokemon[] = [];
    private _error: string = "";
    private _loading: boolean = false;

    get pokemon(): Pokemon[] {
        return this._pokemon;
    }
    get error(): string {
        return this._error;
    }
    get loading(): boolean {
        return this._loading;
    }
    

    constructor(private readonly http: HttpClient) { }

    // Find pokemon
    public findPokemon(startIndex:number, endIndex:number): void {

        console.log("URL: ", `${apiPokemon}?offset=${startIndex-1}&limit=${endIndex-startIndex}`);

        this._loading = true;
        this.http.get<PokemonApiResponse>(`${apiPokemon}?offset=${startIndex-1}&limit=${endIndex-startIndex}`) // ææææsj
        .pipe(
            finalize(() => {
                this._setPokemonSpritesAndId(startIndex, endIndex);
                this._loading = false;
            })
        )
        .subscribe({
            next: (pokemonResponse: PokemonApiResponse) => {
                this._pokemon = pokemonResponse.results;
                //console.log(this._pokemon[0]);
            },
            error: (error: HttpErrorResponse) => {
                this._error = error.message;
            }
        })
    }

    private _setPokemonSpritesAndId(start:number, end:number) : void {
        
        // TODO
        // check for animated sprite or not (based on indices gen #)

        let counter = start;
        for (let i = 0; i <= end-start; i++) {
            let pkmn = this._pokemon[i];
            //console.log(pkmn);
            pkmn.id = counter; // Adds id
            pkmn.name = pkmn.name[0].toUpperCase() + pkmn.name.slice(1,pkmn.name.length); // Capitalizes the names of the pokemon
            //this._setPokemonDWart(pkmn, i); // needed?
            this._setPokemonAnimatedSprite(pkmn); // gen5 animated sprites
            counter ++;
            //console.log(pkmn);
        }
    }

    private _setPokemonDWart(pkmn:Pokemon, id:number) : void {
        pkmn.dwArt = apiPokemonDW + id + ".svg";
        // EZ PZ >:D
    }

    private _setPokemonAnimatedSprite (pkmn:Pokemon) : void {
        //console.log(pkmn.name, apiPokemonAnimated + pkmn.id + ".gif");
        pkmn.animatedSprite = apiPokemonAnimated + pkmn.id + ".gif";
    }

    public pokemonById(id: string): Pokemon | undefined {
        return this._pokemon.find((pkmn : Pokemon) => pkmn.id.toString() === id);
    }

    public pokemonByName(name: string): Pokemon | undefined {
        return this._pokemon.find((pkmn: Pokemon) => pkmn.name.toLowerCase() === name);
    }

    // Find a pokemon based on name (?) override of find by id
    // FIND specific pokemon based on name, extract id from URL via regex, can also just unpack the normal responnse?!

}
