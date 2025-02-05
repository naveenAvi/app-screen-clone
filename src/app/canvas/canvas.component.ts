// @ts-nocheck2
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as fabric from 'fabric';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent implements OnInit {
  @ViewChild('fabricCanvas', { static: true }) fabricCanvas: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChild('myimage') myimage: ElementRef<HTMLImageElement> | undefined
  canvas: fabric.Canvas | undefined;

  screenHeight: number
  // aspectRatio: number =  1290 / 2796; // Aspect ratio = width / height
  aspectRatio: number = 1290 / 2796

  ngOnInit(): void {
    this.screenHeight = window.innerHeight;
  }
  applyRetinaScaling(scaleFactor: number) {
    if (this.canvas && this.fabricCanvas) {
      // Get the current width and height
      const canvasWidth = this.canvas.getWidth();
      const canvasHeight = this.canvas.getHeight();

      // Set the scaled dimensions (multiply the width and height by the scale factor)
      this.canvas.setDimensions({
        width: canvasWidth * scaleFactor,
        height: canvasHeight * scaleFactor
      }, {
        backstoreOnly: true
      });

      // Restore the physical size of the canvas (keeping the width and height in CSS the same)
      this.canvas.setDimensions({
        width: canvasWidth,
        height: canvasHeight
      }, {
        cssOnly: true
      });

      // Apply the scaling factor to the context
      this.canvas.setZoom(scaleFactor);
    }
  }

  // addImageToCanvas(imageUrl: string) {
  //   console.log("Attempting to load image:", imageUrl); // Log the image URL

  //   fabric.Image.fromURL("https://picsum.photos/200/300", (oImg: fabric.Image) => {
  //     console.log("Image loaded:", oImg); // Log the image object
  //     alert("Image loaded successfully!"); // Alert for debugging
  //     oImg.scale(0.5).set('flipX', true);

  //     if (this.canvas) {
  //       this.canvas.add(oImg);
  //     }
  //   }, {
  //     crossOrigin: 'anonymous' // Use if needed for cross-origin images
  //   });
  // }



  ngAfterViewInit() {
    //https://picsum.photos/200/300
    if (this.fabricCanvas) {
      // Set fixed width and height to match the aspect ratio
      this.canvas = new fabric.Canvas(this.fabricCanvas.nativeElement, {
        width: this.screenHeight * this.aspectRatio,
        height: this.screenHeight
      });
      const scaleFactor = window.devicePixelRatio || 1;
      this.applyRetinaScaling(scaleFactor);

      // Example: Add a rectangle to the canvas
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 200,
        height: 100
      });

      this.canvas.add(rect);

      var loremIpsumDolor = new fabric.Textbox("Search through templates to find one you love", {
        fontFamily: 'Assistant',
        textAlign: "center",
        width: this.screenHeight * this.aspectRatio,
        fontSize: 26,
        top: 20
      });
      this.canvas.add(loremIpsumDolor);

      var canvas = new fabric.Canvas('c');
      const imgElement = document.getElementById('my-image') as HTMLImageElement;
      imgElement.onload = () => {
        const imgInstance = new fabric.Image(imgElement, {
          left: 100,
          top: 100,
          opacity: 0.85
        });
        this.canvas.add(imgInstance);
      };
      imgElement.src = 'https://picsum.photos/200/300';  // Ensure you set the src here
    }
  }
}
