import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-catalouge',
  templateUrl: './pokemon-catalouge.page.html',
  styleUrls: ['./pokemon-catalouge.page.css']
})
export class PokemonCatalougePage implements OnInit {

  get pokemon(): Pokemon[] {
    return this.pokemonCatalogueService.pokemon;
  }
  get error(): string {
    return this.pokemonCatalogueService.error;
  }
  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  constructor(private readonly pokemonCatalogueService: PokemonCatalogueService
    ) { }

  ngOnInit(): void {
    this.pokemonCatalogueService.findPokemon();
  }

}
