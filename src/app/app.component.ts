import { RouterOutlet } from '@angular/router';
import { Component} from '@angular/core';
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { ImagenComponent } from "./components/imagen/imagen.component";
import { GameComponent } from "./components/game/game.component";
import { WinnerComponent } from "./components/winner/winner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WelcomeComponent, ImagenComponent, GameComponent, WinnerComponent],
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