import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida-juego',
  standalone: true,
  imports: [],
  templateUrl: './bienvenida-juego.component.html',
  styleUrl: './bienvenida-juego.component.css'
})
export class BienvenidaJuegoComponent {

  constructor(private router: Router) {}

  public redirigirJuego(vidas: number) {
    this.router.navigate(['juego'], { queryParams: { vidas } });
  }
  
}
