import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { PokemonCatalougePage } from './pages/pokemon-catalouge/pokemon-catalouge.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { CatchButtonComponent } from './components/catch-button/catch-button.component';

//Decorator
@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    PokemonCatalougePage,
    TrainerPage,
    PokemonListComponent,
    PokemonComponent,
    CatchButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
