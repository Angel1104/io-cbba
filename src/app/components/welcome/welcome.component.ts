import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule  } from '@angular/forms';
import { LanguageDetector, FilesetResolver } from "@mediapipe/tasks-text";
import { TestComponent } from "../test/test.component";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ReactiveFormsModule, TestComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})

export class WelcomeComponent implements OnInit {
  public languageDetector!: LanguageDetector;
  public idiomaJugador1: string;
  public idiomaJugador2: string;
  formularioJugadores: FormGroup;

  constructor(  ) {
    this.formularioJugadores = new FormGroup({
      nombreJugador1: new FormControl('', [Validators.required]),
      nombreJugador2: new FormControl('', [Validators.required]),
      descripcionJugador1: new FormControl('', [Validators.required]),
      descripcionJugador2: new FormControl('', [Validators.required])
    });
    this.idiomaJugador1 = '';
    this.idiomaJugador2 = '';
  }

  ngOnInit(): void {
    this.createLanguageDetector();
  }

  createLanguageDetector = async () => {
    const text = await FilesetResolver.forTextTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text@0.10.0/wasm"
    );
    this.languageDetector = await LanguageDetector.createFromOptions(text, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/language_detector/language_detector/float32/1/language_detector.tflite`
      },
      maxResults: 1
    });
  };

  obtenerIdiomaTexto(texto: string): any {
    console.log(this.languageDetector.detect(texto))
    return this.languageDetector.detect(texto).languages[0].languageCode; 
  }

  obtenerIdioma() {
    this.idiomaJugador1 = this.obtenerIdiomaTexto(
      this.formularioJugadores.value.descripcionJugador1
    );
    // this.idiomaJugador2 = this.obtenerIdiomaTexto(
    //   this.formularioJugadores.value.descripcionJugador2
    // );
  }

 

}
