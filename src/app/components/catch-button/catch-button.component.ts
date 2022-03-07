import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { CatchService } from 'src/app/services/catch.service';

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

  get loading(): boolean {
    return this.catchService.loading;
  }

  constructor(
    private readonly catchService: CatchService,
  ) { }

  ngOnInit(): void {
  }

  onCatchClick(): void {

    // TODO Add the selected pokemon to the trainer, update API also
    
    //alert("Caught a Pokémon!" + " " + this.pokemon?.name);
    // TODO 
    // change!! This is only session-based, does not consider trainers previously caught pokemon
    // Use trainerService.inCaught instead(?)

    if (this.pokemon.caught) {
      this.pokemon.caught = false;
    } else {
      this.pokemon.caught = true;
    }

    // pass the whole pokemon??
    this.catchService.addToCaught(this.pokemon)
    .subscribe({
      next: (response: Trainer) => {
      console.log("NEXT: ", response);
    },
    error: (error:  HttpErrorResponse) => {
      console.log("ERROR: ", error.message);
    }
    })
  }

}
