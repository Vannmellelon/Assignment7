import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { CatchService } from 'src/app/services/catch.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-catch-button',
  templateUrl: './catch-button.component.html',
  styleUrls: ['./catch-button.component.css']
})
export class CatchButtonComponent implements OnInit {

  //public isCaught: boolean = false;
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
    //private trainerService: TrainerService,
    private readonly catchService: CatchService,
  ) { }

  ngOnInit(): void {
    //this.isCaught = this.trainerService.inCaught(this.pokemon.name);
    // Have this as a field on the pokemon object itself instead
  }

  onCatchClick(): void {
    
    //alert("Caught a Pokémon!" + " " + this.pokemon?.name);

    // Removes/Adds the pokemon to the trainer API
    this.catchService.addToCaught(this.pokemon)
    .subscribe({
      next: (response: Trainer) => {
      console.log("NEXT: ", response);
    },
    error: (error:  HttpErrorResponse) => {
      console.log("ERROR: ", error.message);
    }
    })

    // for stylilng
     // "local" state only
    if (this.pokemon.caught) {
      this.pokemon.caught = false;
    } else {
      this.pokemon.caught = true;
    }
  }

}
