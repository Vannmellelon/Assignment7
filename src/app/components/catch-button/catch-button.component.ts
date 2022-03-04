import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-catch-button',
  templateUrl: './catch-button.component.html',
  styleUrls: ['./catch-button.component.css']
})
export class CatchButtonComponent implements OnInit {

  @Input() pokemon: Pokemon = {
    id: 0,
    name: '',
    dwArt: null,
    animatedSprite: null,
    sprite: null,
    caught: false
  };

  constructor() { }

  ngOnInit(): void {
  }

  onCatchClick(): void {

    // TODO Add the selected pokemon to the trainer, update API also
    
    //alert("Caught a Pokémon!" + " " + this.pokemon?.name);
    if (this.pokemon.caught) {
      this.pokemon.caught = false;
    } else {
      this.pokemon.caught = true;
    }
  }

}
