import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as fabric from 'fabric';

@Component({
  selector: 'app-singlescreen',
  standalone: true,
  imports: [],
  templateUrl: './singlescreen.component.html',
  styleUrl: './singlescreen.component.css'
})
export class SinglescreenComponent {
  @ViewChild('fabricCanvas', { static: true }) fabricCanvas: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChild('myimage') myimage: ElementRef<HTMLImageElement> | undefined

  @Input() height: number
  @Input() width: number

  canvas: fabric.Canvas | undefined;

  // aspectRatio: number =  1290 / 2796; // Aspect ratio = width / height
  aspectRatio: number = 1290 / 2796

  ngOnInit(): void {

  }

  Mockup(width: number, height: number) {

    const phoneBody = new fabric.Rect({
      left: 50,
      top: 50,
      width: 300,
      height: 600,
      rx: 30,  // Rounded corners
      ry: 30,
      fill: 'white',
      stroke: '#ccc',
      strokeWidth: 5
    });

    // Create screen area (smaller rectangle)
    const screen = new fabric.Rect({
      left: 55,
      top: 55,
      width: 290,
      height: 590,
      rx: 20,
      ry: 20,
      fill: '#f0f0f0',  // Light gray to represent the screen
    });


    // Add elements to the canvas
    this.canvas.add(phoneBody);
    this.canvas.add(screen);

    // Optionally, add an image to the screen
    const imageObj = new Image();
    imageObj.src = 'assets/thumbnail_image0.png'; // Path to your screenshot image
    imageObj.onload = () => {
      const imgInstance = new fabric.Image(imageObj, {
        left: 55,
        top: 55,
        width: 290,
        height: 200,
        selectable: false // Prevent moving the image separately
      });
      imgInstance.scaleToWidth(300)
      //this.canvas.add(imgInstance);
      //this.canvas.sendToBack(imgInstance); // Send image to back so it appears under the screen
    };









    // const screenshot = document.getElementById('screenshot') as HTMLImageElement;
    // screenshot.onload = () => {
    //   const imgInstance = new fabric.Image(screenshot, {
    //     strokeWidth: 40,
    //     stroke: "white",
    //     left: 0,
    //     top: 0,
    //     opacity: 1,
    //     cornerStyle: 'circle'
    //   });
    //   imgInstance.scaleToWidth(300); // Scale the image to 300px width

    //   const clipPath = new fabric.Rect({
    //     left: 0,
    //     top: 0,
    //     width: imgInstance.width || 300,  // Set to the width of the image
    //     height: imgInstance.height || 200,  // Set to the height of the image
    //     rx: 30,  // Corner radius for rounding
    //     ry: 30,  // Corner radius for rounding
    //     absolutePositioned: false
    //   });

    //   // Apply the clip path to the image
    //   imgInstance.set({
    //     clipPath: clipPath
    //   });


    //   this.canvas.add(imgInstance);
    //   this.canvas.moveObjectTo(imgInstance, 4);
    // };
    // screenshot.src = 'assets/thumbnail_image0.png';  // Ensure you set the src here
    // screenshot.width = 100;  // Ensure you set the src here
    // screenshot.height = 100;  // Ensure you set the src here

    // const rect2 = new fabric.Rect({
    //   fill: 'red',
    //   width: width + 40,
    //   height: height + 40
    // });

    // this.canvas.add(rect2);
    // this.canvas.moveObjectTo(rect2, 3);
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['height'] && this.height) {
      if (this.fabricCanvas) {
        this.canvas = new fabric.Canvas(this.fabricCanvas.nativeElement, {
          width: this.height * this.aspectRatio,
          height: this.height
        });
        const scaleFactor = window.devicePixelRatio || 1;
        this.applyRetinaScaling(scaleFactor);

        // const rect = new fabric.Rect({
        //   left: 100,
        //   top: 100,
        //   fill: 'red',
        //   width: 200,
        //   height: 100
        // });

        // this.canvas.add(rect);

        // var loremIpsumDolor = new fabric.Textbox("Search through templates to find one you love", {
        //   fontFamily: 'Assistant',
        //   textAlign: "center",
        //   width: this.height * this.aspectRatio,
        //   fontSize: 18,
        //   top: 70,
        //   fill: "white"
        // });
        // this.canvas.add(loremIpsumDolor);

        // var headingg = new fabric.Textbox("stackable Layer", {
        //   fontFamily: 'Assistant',
        //   fontWeight: "bold",
        //   textAlign: "center",
        //   width: this.height * this.aspectRatio,
        //   fontSize: 40,
        //   top: 20,
        //   fill: "white"
        // });
        // this.canvas.add(headingg);

        // var canvas = new fabric.Canvas('c');
        // const imgElement = document.getElementById('my-image') as HTMLImageElement;
        // imgElement.onload = () => {
        //   const imgInstance = new fabric.Image(imgElement, {
        //     height: this.height,
        //     width: this.width,
        //     left: 0,
        //     top: 0,
        //     opacity: 1
        //   });
        //   this.canvas.add(imgInstance);
        //   this.canvas.moveObjectTo(imgInstance, 0);
        // };
        // imgElement.src = 'assets/bg-7-full.jpg';  // Ensure you set the src here


        this.Mockup(300, 300)

      }
    }
  }

  // ngAfterViewInit() {
  //   //https://picsum.photos/200/300
  //   if (this.fabricCanvas) {
  //     // Set fixed width and height to match the aspect ratio
  //     this.canvas = new fabric.Canvas(this.fabricCanvas.nativeElement, {
  //       width: this.screenHeight * this.aspectRatio,
  //       height: this.screenHeight
  //     });
  //     const scaleFactor = window.devicePixelRatio || 1;
  //     this.applyRetinaScaling(scaleFactor);

  //     // Example: Add a rectangle to the canvas
  //     const rect = new fabric.Rect({
  //       left: 100,
  //       top: 100,
  //       fill: 'red',
  //       width: 200,
  //       height: 100
  //     });

  //     this.canvas.add(rect);

  //     var loremIpsumDolor = new fabric.Textbox("Search through templates to find one you love", {
  //       fontFamily: 'Assistant',
  //       textAlign: "center",
  //       width: this.screenHeight * this.aspectRatio,
  //       fontSize: 26,
  //       top: 20
  //     });
  //     this.canvas.add(loremIpsumDolor);

  //     var canvas = new fabric.Canvas('c');
  //     const imgElement = document.getElementById('my-image') as HTMLImageElement;
  //     imgElement.onload = () => {
  //       const imgInstance = new fabric.Image(imgElement, {
  //         left: 100,
  //         top: 100,
  //         opacity: 0.85
  //       });
  //       this.canvas.add(imgInstance);
  //     };
  //     imgElement.src = 'https://picsum.photos/200/300';  // Ensure you set the src here
  //   }
  // }
}
