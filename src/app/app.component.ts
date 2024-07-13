import { RouterOutlet } from '@angular/router';
import { Component} from '@angular/core';
import {BienvenidaComponent} from './pages/bienvenida/bienvenida.component';
import {BienvenidaJuegoComponent} from './pages/bienvenida-juego/bienvenida-juego.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BienvenidaComponent, BienvenidaJuegoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public iniciar: boolean;
  public text: string;

  constructor() {
    this.iniciar = false;
    this.text = 'INICIAR';
  }

  iniciarJuego() {
    if (!this.iniciar) {
      this.text = 'REINICIAR'
      this.iniciar = true;
    }else {
      this.text = 'INICIAR'
      this.iniciar = false;
    }
  }
}