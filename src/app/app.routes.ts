import { Routes } from '@angular/router';
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { GameComponent } from "./components/game/game.component";

export const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'game', component: GameComponent }, 
  ];
