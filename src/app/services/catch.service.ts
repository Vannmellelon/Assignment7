import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';

const {apiKey, apiTrainers} = environment;

@Injectable({
  providedIn: 'root'
})
export class CatchService {

  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly trainerService: TrainerService,
  ) { }

  // Get pokemon based on id/name(?)

  // patch request with userId and pokemon [name, picURL]

  public addToCaught(pkmn: Pokemon): Observable<Trainer> {

    // Is there a trainer?
    if (!this.trainerService.trainer) {
      throw new Error("addToCaught: There is no trainer.");
    }
    const trainer: Trainer = this.trainerService.trainer;

    // Is there a pokemon?
    //const pokemon: Pokemon | undefined = this.pokemonService.pokemonById(pkmn.id.toString());
    if (!pkmn) {
      throw new Error("addToCaught: Invalid pokemon id"); // actually useless now? but OK
    }

    // Is pokemon caught? 
    // YES: Remove from catch-list
    // NO: Add to catch-list
    if (this.trainerService.inCaught(pkmn.name)) {
      throw new Error("addToCaught: Pokemon already caught.");
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey
    })

    this._loading = true;
    console.log("TRAINER API: ",  `${apiTrainers}/${trainer.id}`);
    // TODO
    // Change to array of [pkmn name, pic URL] (?)
    return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`, {
      pokemon: [...trainer.pokemon, [pkmn.name, pkmn.animatedSprite]]
    }, {
      headers
    })
    .pipe(
      // tap -> side effect
      tap((updatedTrainer: Trainer) => {
        this.trainerService.trainer = updatedTrainer;
      }),
      finalize(() => {
        this._loading = false;
      })
    )
  }


}
