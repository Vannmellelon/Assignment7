import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';

// TODO
// Set caught pokemon
// Remove caught pokemon

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
      return Boolean(this._trainer?.pokemon.find((trainerPkmnName: string) => trainerPkmnName === pkmnName)); // TODO change to array [pokemon name, picURL]
    }
    return false;
  } 
}
