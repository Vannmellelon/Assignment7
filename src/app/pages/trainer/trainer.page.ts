import { Component, Input, OnInit } from '@angular/core';
import { GenerationKeys } from 'src/app/enums/generation-keys.enum';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { TrainerService } from 'src/app/services/trainer.service';



@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

   get trainer(): Trainer | undefined {
    return this.trainerService.trainer;
  }

  get pokemon(): Pokemon[] {
    return this.pokemonCatalogueService.pokemon;
  }
  get error(): string {
    return this.pokemonCatalogueService.error;
  }
  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  // same as pokemon catalouge page atm, DO change
  // Should read from trainer api and get list of favourite pokemon.
  // If they are stored with IDs, can display same as catalouge page.
  // Workaround, can display pictures based on names(?? endpoint, other URL)
  // Write separate functions for this, trainer service elns
  constructor(
    private readonly trainerService: TrainerService,
    private readonly pokemonCatalogueService: PokemonCatalogueService
    ) { }

  ngOnInit(): void {
    this.pokemonCatalogueService.findPokemon(GenerationKeys.gen1Start, GenerationKeys.gen2Start);
  }

  /* public pokemonCheck() {
    let imgs: string[] = []
    this.trainer?.pokemon.map(pokemon => {
      for ( let pkm of this.pokemon ){
        if (pokemon === pkm.name) {
          if (pkm.dwArt != null) {
            imgs.push(pkm.dwArt)
          }
        }
      }
      
      return imgs
    }) 
  } */
}