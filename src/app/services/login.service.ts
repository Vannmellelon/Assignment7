import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from "../models/trainer.model"

const trainerUrl = environment.apiTrainers
const apiKey = environment.apiKey

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }

  public login(username: string): Observable<Trainer> {
    return this.checkUsername(username)
      .pipe(
        switchMap((trainer: Trainer | undefined) => {
          if (trainer === undefined) {
            return this.createUser(username)
          }
          return of(trainer)
        })
      )
  }
  //login

  //check if user exists
  private checkUsername(username: string): Observable<Trainer | undefined> {
    return this.http.get<Trainer[]>(`${trainerUrl}?username=${username}`)
      .pipe(
        map((response: Trainer[]) => {
          return response.pop();
      })
      )
  }

  //If no user - create user
  private createUser(username: string): Observable<Trainer> {
    const trainer = {
      username,
    }
    const headers = new HttpHeaders({
      "Content-Tupe": "application/json",
      "x-api-key": apiKey
    })
    return this.http.post<Trainer>(trainerUrl, trainer, {
      headers
    })
  }
}
