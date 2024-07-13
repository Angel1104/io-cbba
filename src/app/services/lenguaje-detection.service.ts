import { Injectable } from '@angular/core';
import { LanguageDetector, FilesetResolver } from "@mediapipe/tasks-text";

@Injectable({
  providedIn: 'root'
})
export class LenguajeDetectionService {
  private languageDetector: LanguageDetector | null = null;

  constructor() { }

  async createLanguageDetector(): Promise<void> {
    if (!this.languageDetector) {
      const text = await FilesetResolver.forTextTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text@0.10.0/wasm');
      this.languageDetector = await LanguageDetector.createFromOptions(text, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/language_detector/language_detector/float32/1/language_detector.tflite`
        },
        maxResults: 1
      });
    }
  }

  async detectLanguage(text: string): Promise<string | null> {
    await this.createLanguageDetector();

    if (!this.languageDetector) {
      console.error('LanguageDetector failed to initialize.');
      return null;
    }

    const results = await this.languageDetector.detect(text);
      return results.languages[0].languageCode;
  }
}