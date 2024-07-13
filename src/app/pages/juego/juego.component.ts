import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebcamComponent } from '../../logic/webcam/webcam.component';
import { WelcomeComponent } from "../../components/welcome/welcome.component";
import { GestureRecognitionService } from '../../services/gesture-recognizer.service';
import { PiedraPapelTijeraService } from '../../services/piedra-papel-tijera.service';

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [WelcomeComponent, WebcamComponent],
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
  public vidas: number;
  public jugador: string;
  public jugadas: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private gestureRecognitionService: GestureRecognitionService,
    private piedraPapelTijeraService: PiedraPapelTijeraService,
    private router: Router
  ) {
    this.vidas = 0;
    this.jugador = '';
    this.jugadas = [];
  }

  ngOnInit() {
    this.vidas = this.activatedRoute.snapshot.queryParams['vidas'] || 1;
  }

  handleResetImagen(): void {
    this.jugador = '';
  }

  handleImagenCapturada(imagen: Blob): void {
    const reader = new FileReader();
    reader.onload = async (event: any) => {
      const img = new Image();
      img.onload = async () => {
        const recognizedGesture = await this.gestureRecognitionService.recognizeGesture(img);
        console.log(recognizedGesture);
        if (recognizedGesture) {
          this.jugador = this.piedraPapelTijeraService.play(recognizedGesture);
          this.jugada(this.jugador);

          if (this.jugador !== 'empate') {
            this.jugadas.push(this.jugador);
          }
        } else {
          this.jugador = 'no reconocio';
          console.log('No gesture recognized.');
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(imagen);
  }

  private jugada(jugada: string) {
    if (jugada === 'no reconocio' || jugada === 'empate') {
      return;
    }

    this.vidas -= 1;

    if (this.vidas === 0) {
      this.determineWinnerAndNavigate();
    }
  }

  private determineWinnerAndNavigate(): void {
    const wins = this.jugadas.filter(jugada => jugada === 'Ganaste').length;
    const losses = this.jugadas.filter(jugada => jugada === 'Perdiste').length;

    //empate
    let winner = 'Empate';

    if (wins > losses) {
      winner = 'Ganaste';
    } else if (losses > wins) {
      winner = 'Perdiste';
    }

    this.router.navigate(['resultado'], { queryParams:  {winner} });
  }
}
