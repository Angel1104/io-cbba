import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import {
  GestureRecognizer,
  FilesetResolver
} from "@mediapipe/tasks-vision";
import { ImagenComponent } from "../imagen/imagen.component";
import { WinnerComponent } from "../winner/winner.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [ImagenComponent, WinnerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  machineWins: boolean = false;

  public imagenSnapshot: string | null = null;
  public gestureRecognizer: GestureRecognizer | null = null;
  public jugador: string = '';

  public jugadorSelection: string;
  public machineSelection: string;
  public ocultarGanador: boolean = true;

  @ViewChildren('detectOnClick') imageContainers!: QueryList<ElementRef>;
  @ViewChildren(ImagenComponent) imagenComponent!: QueryList<ImagenComponent>;

  constructor() {
    this.jugadorSelection = '';
    this.machineSelection = '';
  }

  ngOnInit(): void {
    this.createGestureRecognizer();
  }

  async createGestureRecognizer(): Promise<void> {
    const vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm');
    this.gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task",
        delegate: 'GPU'
      },
      runningMode: "IMAGE",
      numHands: 2,
      minHandDetectionConfidence: 0.2,
      minHandPresenceConfidence: 0.2
    });
  }

   processSnapshot(image: HTMLImageElement):  void {
    if (!this.gestureRecognizer) {
      console.error('GestureRecognizer is not initialized.');
      return;
    }
    const results = this.gestureRecognizer.recognize(image);
    if (results.gestures.length > 0) {
      console.log(results)
      this.jugador = results.gestures[0][0].categoryName;
      const handedness = results.handednesses[0][0].displayName;
      this.jugador = this.mapGestureToSelection(results.gestures[0][0].categoryName);
      this.machine();
    } else {
      console.log('No gestures recognized.');
    }
  }

  mapGestureToSelection(gestureName: string): string {
    const gestureMap: { [key: string]: string } = {
      'Open_Palm': 'Papel',
      'Closed_Fist': 'Piedra',
      'Victory': 'Tijera',
    };
    return gestureMap[gestureName] || 'Unrecognized';
  }

  machine(): void {
    const options = ['Piedra', 'Papel', 'Tijera'];
    this.machineSelection = options[Math.floor(Math.random() * options.length)];

    this.jugadorSelection = this.jugador;

    console.log(this.jugadorSelection, this.machineSelection)
    if (
      (this.jugadorSelection === 'Piedra' && this.machineSelection === 'Tijera') ||
      (this.jugadorSelection === 'Papel' && this.machineSelection === 'Piedra') ||
      (this.jugadorSelection === 'Tijera' && this.machineSelection === 'Papel')
    ) {
      this.machineWins = false;
    } else if (
      (this.machineSelection === 'Piedra' && this.jugadorSelection === 'Tijera') ||
      (this.machineSelection === 'Papel' && this.jugadorSelection === 'Piedra') ||
      (this.machineSelection === 'Tijera' && this.jugadorSelection === 'Papel')
    ) {
      this.machineWins = true;
    } else {
      this.machineWins = false;
    }
    this.ocultarGanador = false;
  }
  

  handleImagenCapturada(imagen: Blob): void {
    this.ocultarGanador = true;
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const img = new Image();
      img.onload = () => {
        this.processSnapshot(img);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(imagen);
  }

}