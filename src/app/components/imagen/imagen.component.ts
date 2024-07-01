import { Component, OnInit, OnDestroy, Output, EventEmitter, AfterViewInit } from '@angular/core';

declare var Webcam: any;

@Component({
  selector: 'app-imagen',
  standalone: true,
  imports: [],
  templateUrl: './imagen.component.html',
  styleUrl: './imagen.component.css'
})
export class ImagenComponent implements AfterViewInit, OnDestroy {

  @Output() imagenCapturada:any = new EventEmitter<string>();

  snapshot: string | null = null;
  camVisible: boolean = true;

  constructor() { }

  ngAfterViewInit(): void {
    Webcam.set({
      width: 320,
      height: 240,
      image_format: 'jpeg',
      jpeg_quality: 90
    });
    Webcam.attach('#my_camera');
  }

  ngOnDestroy(): void {
    Webcam.reset();
  }

  takeSnapshot(): void {
      Webcam.snap((data_uri: string) => {
        const blob = this.dataURItoBlob(data_uri);
        this.snapshot = data_uri;
        this.camVisible = false;
        this.imagenCapturada.emit(blob);
      });
  }
  
  dataURItoBlob(dataURI: string) {
    const mimeType = dataURI.split(',')[0].split(':')[1];
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: mimeType });
    return blob;
  }

  resetSnapshot(): void {
    this.snapshot = null;
    this.camVisible = true;
    Webcam.attach('#my_camera');
  }
}
