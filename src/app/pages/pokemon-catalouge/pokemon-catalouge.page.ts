import { Component, OnInit } from '@angular/core';
import { GenerationKeys } from 'src/app/enums/generation-keys.enum';
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
    this.pokemonCatalogueService.findPokemon(GenerationKeys.gen1Start, GenerationKeys.gen2Start);
  }

  // TODO Get input value from selector, find pokemon from given gen
  // row of buttons instead of selector?
  // can start with gen 1
}
