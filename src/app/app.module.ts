import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonCatalogueComponent } from './components/pokemon-catalogue/pokemon-catalogue.component';
import { LoginPage } from './pages/login/login.page';
import { PokemonCatalougePage } from './pages/pokemon-catalouge/pokemon-catalouge.page';
import { TrainerPage } from './pages/trainer/trainer.page';

//Decorator
@NgModule({
  declarations: [
    AppComponent,
    PokemonCatalogueComponent
    LoginPage,
    PokemonCatalougePage,
    TrainerPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
