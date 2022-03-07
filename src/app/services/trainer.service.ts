import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';


@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private _trainer?: Trainer;

  public get trainer(): Trainer | undefined {
    return this._trainer
  }

  public set trainer (trainer: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer!)
    this._trainer = trainer
  }

  constructor() { 
    this._trainer = StorageUtil.storageRead<Trainer>(StorageKeys.Trainer)
    
  }

  public inCaught(pkmnName: string): boolean {
    
    if (this._trainer) {
      return Boolean(this._trainer?.pokemon.find((trainerPkmn: string[]) => trainerPkmn[0] === pkmnName));
    }
    return false;
  }

  public catchPokemon(pkmn: Pokemon): void {

    // trixing and fixing
    let _pkmnImage = ""
    if (pkmn.animatedSprite) {
      _pkmnImage = pkmn.animatedSprite;
    } else {
      _pkmnImage = "undefined :'(";
    }

    if (this._trainer) {
      this._trainer.pokemon.push([pkmn.name, _pkmnImage]);
    }
  }

  public releasePokemon(pkmnName: string): void {

    if (this._trainer) {
      let _index: number = this._trainer.pokemon.findIndex((trainerPkmn: string[]) => trainerPkmn[0] === pkmnName);
      if (_index >= 0) {
        this._trainer.pokemon.splice(_index,1);
      }
    }
  }
}
