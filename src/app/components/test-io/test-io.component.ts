import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ImagenComponent } from "../imagen/imagen.component";
import {
  FilesetResolver,
  FaceStylizer,
  MPImage,
} from "@mediapipe/tasks-vision";

@Component({
  selector: 'app-test-io',
  standalone: true,
  imports: [ImagenComponent],
  templateUrl: './test-io.component.html',
  styleUrl: './test-io.component.css'
})
export class TestIoComponent  {

  public faceStylizer!: FaceStylizer;
  public imagenSnapshot!: string;
  public faceStylizerResult!: any;
  public imageSrc: string | null = null;

  @ViewChildren('detectOnClick') imageContainers!: QueryList<ElementRef>;
  @ViewChildren(ImagenComponent) imagenComponent!: QueryList<ImagenComponent>;

  ngOnInit(): void {
  }

  // convertMPImageToDataUrl(mpImage: MPImage): void {
  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');
  //   if (!ctx) {
  //     console.error('Failed to get canvas context');
  //     return;
  //   }
  //   canvas.width = mpImage.width;
  //   canvas.height = mpImage.height;
  //   ctx.putImageData(mpImage.getAsImageData(), 0, 0);
  //   this.imageSrc = canvas.toDataURL('image/png');
  // }

  // handleImagenCapturada(imagen: Blob): void {
  //   const reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     const img = new Image();
  //     img.onload = () => {
  //       this.processSnapshot(img);
  //     };
  //     img.src = event.target.result;
  //   };
  //   reader.readAsDataURL(imagen);
  // }

}
