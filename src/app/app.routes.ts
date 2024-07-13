import { Routes } from '@angular/router';
import {BienvenidaComponent} from './pages/bienvenida/bienvenida.component';
import {BienvenidaJuegoComponent} from './pages/bienvenida-juego/bienvenida-juego.component';
import {JuegoComponent} from './pages/juego/juego.component';
import {ResultadoComponent} from './pages/resultado/resultado.component';

export const routes: Routes = [
    { path: '', component: BienvenidaComponent },
    { path: 'game', component: BienvenidaJuegoComponent },
    { path: 'juego', component : JuegoComponent},
    { path: 'resultado', component: ResultadoComponent}
  ];
