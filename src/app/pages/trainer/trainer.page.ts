import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';


@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

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
  constructor(private readonly pokemonCatalogueService: PokemonCatalogueService
    ) { }

  ngOnInit(): void {
    //this.pokemonCatalogueService.findPokemon();
  }

}
