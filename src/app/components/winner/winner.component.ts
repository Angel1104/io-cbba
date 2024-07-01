import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule  } from '@angular/forms';
import { TextClassifier, FilesetResolver, TextClassifierResult } from "@mediapipe/tasks-text";

@Component({
  selector: 'app-winner',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './winner.component.html',
  styleUrl: './winner.component.css'
})
export class WinnerComponent {
[x: string]: any;
  @Input() jugadorSelection: string;
  @Input() machineSelection: string;
  @Input() machineWins: boolean;

  public comentarioForm!: FormGroup;
  public textClassifier: TextClassifier | null = null;
  public classificationResult: TextClassifierResult | null = null;

  constructor() {
    this.jugadorSelection = '';
    this.machineSelection = '';
    this.machineWins = false;
    this.comentarioForm = new FormGroup({
      comentario: new FormControl('', [Validators.required])
    });
    this.createTextClassifier();
  }

  async createTextClassifier() {
    const text = await FilesetResolver.forTextTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text@0.10.0/wasm"
    );
    this.textClassifier = await TextClassifier.createFromOptions(text, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/text_classifier/bert_classifier/float32/1/bert_classifier.tflite`
      },
      maxResults: 1
    });
  }

   submitComentario() {
    if (!this.textClassifier) {
      console.error('TextClassifier is not initialized.');
      return;
    }

    const comentario = this.comentarioForm.value.comentario;
    this.classificationResult =  this.textClassifier.classify(comentario);
    console.log(this.classificationResult)
    
  }

  getWinner(): string {
    if (this.machineWins) {
      return '¡Ganó la máquina!';
    } else if (this.jugadorSelection && this.machineSelection) {
      return '¡Ganaste!';
    } else {
      return '';
    }
  }
}
