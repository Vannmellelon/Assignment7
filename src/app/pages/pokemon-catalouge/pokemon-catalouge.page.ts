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

  selectedRegion: string = "1";

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

  // Gets input value from selector, fetches pokemon from given gen, kinda spamming the API fix IF-TIME
  onChangeRegion(): void {

    switch (this.selectedRegion) {
      case ("1"):
        this.pokemonCatalogueService.findPokemon(GenerationKeys.gen1Start, GenerationKeys.gen2Start);
        break;
      case ("2"):
        this.pokemonCatalogueService.findPokemon(GenerationKeys.gen2Start, GenerationKeys.gen3Start);
        break;  
      case ("3"):
        this.pokemonCatalogueService.findPokemon(GenerationKeys.gen3Start, GenerationKeys.gen4Start);
        break;
      case ("4"):
        this.pokemonCatalogueService.findPokemon(GenerationKeys.gen4Start, GenerationKeys.gen5Start);
        break;
      case ("5"):
        this.pokemonCatalogueService.findPokemon(GenerationKeys.gen5Start, GenerationKeys.gen6Start);
        break;
      default:
        console.log("Region selector default.");
        break;
    }
  }
}
