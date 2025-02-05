import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as fabric from 'fabric';
import { SharedDataService } from '../../../shared-data.service';

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

  private mockupWidth = 304;  // Width of the mockup (screen area)
  private mockupHeight = 600; // Height of the mockup (screen area)
  private cornerRadius = 30;  // Corner radius of the mockup

  constructor(private sharedService: SharedDataService) {

  }
  ngOnInit(): void {
    this.sharedService.currentValue.subscribe(value => {
      console.log("from app screen", value)
    });
  }

  Mockup2(width: number, height: number) {

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
    const screenBezel = new fabric.Rect({
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
    //this.canvas.add(screen);

    // Optionally, add an image to the screen
    const imageObj = new Image();
    imageObj.src = 'assets/thumbnail_image0.png'; // Path to your screenshot image
    imageObj.onload = () => {

      const desiredWidth = 100
      const desiredHeight = 100


      const originalWidth = imageObj.width;
      const originalHeight = imageObj.height;

      const aspectRatio = originalWidth / originalHeight;
      let scaledWidth, scaledHeight;

      if (originalWidth > desiredWidth || originalHeight > desiredHeight) {
        if (aspectRatio > 1) {
          // Image is wider than tall
          scaledWidth = desiredWidth;
          scaledHeight = desiredWidth / aspectRatio;
        } else {
          // Image is taller than wide
          scaledHeight = desiredHeight;
          scaledWidth = desiredHeight * aspectRatio;
        }
      } else {
        // Original size is smaller than desired size
        scaledWidth = originalWidth;
        scaledHeight = originalHeight;
      }
      const imgInstance = new fabric.Image(imageObj, {
        left: 55,
        top: 55,

      });
      imgInstance.scaleToWidth(295)
      this.canvas.add(imgInstance);
      //this.canvas.sendToBack(imgInstance); // Send image to back so it appears under the screen
    };
  }
  Mockup(width: Number, height: Number) {
    // Create phone body (rounded rectangle)
    const phoneBody = new fabric.Rect({
      left: 50,
      top: 50,
      width: 300,
      height: 600,
      rx: 30,  // Rounded corners
      ry: 30,
      fill: 'white',
      stroke: '#ccc',
      strokeWidth: 5,
    });

    // Create clipping path for the screen area (rounded rectangle)
    const screenClip = this.createRoundedClipPath(55, 55, this.mockupWidth - 10, this.mockupHeight - 10, this.cornerRadius);

    //this.canvas.add(phoneBody);

    // Load and add the image to the screen with clipping mask
    const imageObj = new Image();
    imageObj.src = 'assets/thumbnail_image0.png'; // Path to your screenshot image

    imageObj.onload = () => {
      const imgInstance = new fabric.Image(imageObj, {
        left: 55,
        top: 55,
        skewX: 10,
        angle: 10,
        selectable: false, // Prevent moving the image separately,
      });
      imgInstance.scaleToWidth(this.mockupWidth)

      const group = new fabric.Group([screenClip, imgInstance], {
        left: 55,
        top: 55,
      });
      this.canvas.add(group);

      group.clipPath = screenClip;
      //group.clipPath.visible = false; // Hide the clipping path but keep it functional
      group.dirty = true; // Mark the group as needing to be redrawn
      // this.canvas.renderAll(); // Refresh the canvas

      const fullgroup = new fabric.Group([phoneBody, group], {
        left: 55,
        top: 55,

      });
      this.canvas.add(fullgroup);

      const canvasJSON = this.canvas.toJSON(); // Export canvas as JSON object
    console.log(canvasJSON); // You can log it or store it in a database
    };

    
  }
  Mockupworks(width: number, height: number) {
    // Create phone body (rounded rectangle)
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

    // Create clipping path for the screen area (rounded rectangle)
    const screenClip = new fabric.Path('M 55 55 L 345 55 C 355 55 360 60 360 70 L 360 645 C 360 655 355 660 345 660 L 55 660 C 45 660 40 655 40 645 L 40 70 C 40 60 45 55 55 55 Z', {
      fill: 'transparent',
      selectable: false
    });

    // Optional: Create a camera or home button
    const camera = new fabric.Circle({
      left: 180,
      top: 15,
      radius: 5,
      fill: 'black'
    });

    const homeButton = new fabric.Circle({
      left: 190,
      top: 650,
      radius: 10,
      fill: 'black'
    });

    // Add elements to the canvas
    this.canvas.add(phoneBody);
    this.canvas.add(camera);
    this.canvas.add(homeButton);

    // Load and add the image to the screen with clipping mask
    const imageObj = new Image();
    imageObj.src = 'assets/thumbnail_image0.png'; // Path to your screenshot image

    // var rect = new fabric.Rect({
    //   left: 10,
    //   top: 10,
    //   width: 140,
    //   height: 215,
    //   stroke: 'red',
    //   strokeWidth: 3,
    //   rx: 10,
    //   ry: 10
    // });
    // this.canvas.add(rect);

    // fabric.util.loadImage('http://fabricjs.com/assets/pug.jpg', function (img) {
    //   rect.setPatternFill({
    //     source: img,
    //     repeat: 'no-repeat',
    //     patternTransform: [0.2, 0, 0, 0.2, 0, 0]
    //   });
    //   canvas.renderAll();
    // });


    imageObj.onload = () => {
      const imgInstance = new fabric.Image(imageObj, {
        left: 40,
        top: 55,
        width: 290, // Set width according to your requirements
        height: 590, // Set height according to your requirements
        selectable: false, // Prevent moving the image separately,
        // clipPath: new fabric.Circle({
        //   radius: 300,
        //   originX: 'center',
        //   originY: 'center',
        // }),

        clipPath: new fabric.Rect({
          width: 290,
          height: 590,
          originX: 'center',
          originY: 'center',
          rx: 30,
          ry: 30,

        }),
      });
      imgInstance.scaleToWidth(295)

      // Create a group with the image and the clipping path
      const group = new fabric.Group([screenClip, imgInstance], {
        left: 55,
        top: 55,
        selectable: false // Prevent moving the group separately
      });

      // Add the group to the canvas and send it to back
      this.canvas.add(group);
      // this.canvas.sendObjectToBack(group); // Send group to back so it appears under the phone body

      // Set the clipping mask
      group.clipPath = screenClip;
      //group.clipPath.visible = false; // Hide the clipping path but keep it functional
      group.dirty = true; // Mark the group as needing to be redrawn
      // this.canvas.renderAll(); // Refresh the canvas
    };
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
        this.applyRetinaScaling(2);

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

        var loremIpsumDolor = new fabric.Textbox("Search through templates to find one you love", {
          fontFamily: 'Assistant',
          textAlign: "center",
          width: this.width * this.aspectRatio,
          fontSize: 26,
          top: 20,
          fontWeight: 600
        });
        this.canvas.add(loremIpsumDolor);


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

  createRoundedClipPath(left: number, top: number, width: number, height: number, radius: number): fabric.Path {
    const path = `
      M ${left + radius} ${top}
      L ${left + width - radius} ${top}
      Q ${left + width} ${top} ${left + width} ${top + radius}
      L ${left + width} ${top + height - radius}
      Q ${left + width} ${top + height} ${left + width - radius} ${top + height}
      L ${left + radius} ${top + height}
      Q ${left} ${top + height} ${left} ${top + height - radius}
      L ${left} ${top + radius}
      Q ${left} ${top} ${left + radius} ${top}
      Z
    `;
    return new fabric.Path(path, {
      fill: 'transparent',
      selectable: false
    });
  }
}
