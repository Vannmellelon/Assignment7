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

    // Find a pokemon based on id
    public findPokemon(): void {

        this._loading = true;
        this.http.get<PokemonApiResponse>(apiPokemon)
        .pipe(
            finalize(() => {
                this._loading = false;
                this._setPokemonSprites();
            })
        )
        .subscribe({
            next: (pokemonResponse: PokemonApiResponse) => {
                console.log("pokemon i next", pokemonResponse);
                this._pokemon = pokemonResponse.results;
                //console.log(this._pokemon[0]);
                // TODO figure out how to set ids in the pokemon objects when getting
            },
            error: (error: HttpErrorResponse) => {
                this._error = error.message;
            }
        })
    }

    private _setPokemonSprites() : void {
        
        // refactor?! lol
        let counter = 1;
        for (let pkmn of this._pokemon) {
            this._setPokemonDWart(pkmn, counter);
            counter ++;
            //console.log(pkmn);
        }
    }

    private _setPokemonDWart(pkmn:Pokemon, id:number) : void {
        console.log("Hello from setDWart")
        pkmn.dwArt = apiPokemonDW + id + ".svg";
        // EZ PZ >:D

        /*
        this.http.get<string>(apiPokemonDW + id + ".svg")
        .subscribe({
            next: (dwImage: string) => {
                console.log("dwImage", dwImage)
                pkmn.dwArt = dwImage;
                console.log("set DW art", pkmn);
            },
            error: (error: HttpErrorResponse) => {
                //this._error = error.message;
                // do something mayB ig :P
            }
        })
        */
    }

    // Check for pokemon function (?)
    // do we need it? we will control what pokemon we are getting

    // Find a pokemon based on name (?) override of find by id
    // Find a list of pokemon based on id-intervall (?) region-endpoint?
}
