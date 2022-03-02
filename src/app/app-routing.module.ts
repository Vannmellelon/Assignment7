import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { PokemonCatalougePage } from './pages/pokemon-catalouge/pokemon-catalouge.page';
import { TrainerPage } from './pages/trainer/trainer.page';

const routes: Routes = [
  {
    path: "",
    component: LoginPage
  },
  {
    path: "trainer",
    component: TrainerPage
  },
  {
    path: "profile",
    component: PokemonCatalougePage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ], // import a module
  exports: [
    RouterModule
  ] // export module and its features
})
export class AppRoutingModule { } 