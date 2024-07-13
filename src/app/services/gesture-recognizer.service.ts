import { Injectable } from '@angular/core';
import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";

@Injectable({
  providedIn: 'root'
})
export class GestureRecognitionService {

  private gestureRecognizer: GestureRecognizer | null = null;

  constructor() { }

  async initializeGestureRecognizer(): Promise<void> {
    if (!this.gestureRecognizer) {
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
  }

  async recognizeGesture(image: HTMLImageElement): Promise<string | null> {
    await this.initializeGestureRecognizer(); // Ensure recognizer is initialized

    if (!this.gestureRecognizer) {
      console.error('GestureRecognizer failed to initialize.');
      return null;
    }

    const results = await this.gestureRecognizer.recognize(image);
    if (results.gestures.length > 0) {
      const gestureName = results.gestures[0][0].categoryName;
      return this.mapGestureToSelection(gestureName);
    } else {
      return null;
    }
  }

  private mapGestureToSelection(gestureName: string): string {
    const gestureMap: { [key: string]: string } = {
      'Open_Palm': 'Papel',
      'Closed_Fist': 'Piedra',
      'Victory': 'Tijera',
    };
    return gestureMap[gestureName] || 'Unrecognized';
  }
}
