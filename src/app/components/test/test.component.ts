import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ImagenComponent } from "../imagen/imagen.component";
import {
  FilesetResolver,
  FaceStylizer,
  MPImage,
} from "@mediapipe/tasks-vision";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ImagenComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit{

  public faceStylizer!: FaceStylizer;
  public imagenSnapshot!: string;
  public faceStylizerResult!: any;
  public imageSrc: string | null = null;

  @ViewChildren('detectOnClick') imageContainers!: QueryList<ElementRef>;
  @ViewChildren(ImagenComponent) imagenComponent!: QueryList<ImagenComponent>;

  ngOnInit(): void {
    this.initializeFaceStylizer();
  }
  
  async initializeFaceStylizer(): Promise<void> {
    if (this.faceStylizer) {
      this.faceStylizer.close();
    }
    const vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.6/wasm');
    this.faceStylizer = await FaceStylizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_stylizer/blaze_face_stylizer/float32/latest/face_stylizer_color_ink.task"
      }
    });
  }

  processSnapshot(image: HTMLImageElement):  void {
    this.faceStylizerResult  = this.faceStylizer.stylize(image);
    this.convertMPImageToDataUrl(this.faceStylizerResult);
    console.log(this.faceStylizerResult)
  }

  convertMPImageToDataUrl(mpImage: MPImage): void {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }
    canvas.width = mpImage.width;
    canvas.height = mpImage.height;
    ctx.putImageData(mpImage.getAsImageData(), 0, 0);
    this.imageSrc = canvas.toDataURL('image/png');
  }

  handleImagenCapturada(imagen: Blob): void {
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
