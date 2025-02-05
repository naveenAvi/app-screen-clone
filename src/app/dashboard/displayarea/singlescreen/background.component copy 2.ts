import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as fabric from 'fabric';
import { SharedDataService } from '../../../shared-data.service';
import html2canvas from 'html2canvas';

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
  aspectRatio: number = 1290 / 2796

  private mockupWidth = 304;
  private mockupHeight = 600;

  constructor(private sharedService: SharedDataService) {

  }
  ngOnInit(): void {
    this.sharedService.LayersListValue.subscribe(value => {
      console.log("from app screen", value)
      this.canvas.clear()
      this.showLayers(value);

    });
  }

  MockupFront(left: number, top: number, width: number, height: number, screenshotUrl: string) {
    const cornerRadius = 30;  // Corner radius of the mockup
    const screenClip = this.createRoundedClipPath(left, top, +width - 10, + height - 10, cornerRadius);

    const phoneBody = new Image();
    phoneBody.src = 'assets/iphone-6.PNG'; // Path to your screenshot image

    phoneBody.onload = () => {
      const phoneInstance = new fabric.Image(phoneBody, {
        left: left,
        top: top,
        // skewX: 10,
        // angle: 10,
        selectable: false, // Prevent moving the image separately,
      });
      phoneInstance.scaleToWidth(this.mockupWidth)

      const imageObj = new Image();
      imageObj.src = screenshotUrl; // Path to your screenshot image

      imageObj.onload = () => {
        const imgInstance = new fabric.Image(imageObj, {
          left: left + 20,
          top: top + 70,
          // skewX: 10,
          // angle: 10,
          selectable: false, // Prevent moving the image separately,
        });
        imgInstance.scaleToWidth(this.mockupWidth - 40)

        const group = new fabric.Group([screenClip, imgInstance], {
          left: left,
          top: top,
        });
        this.canvas.add(group);

        group.clipPath = screenClip;
        //group.clipPath.visible = false; // Hide the clipping path but keep it functional
        group.dirty = true; // Mark the group as needing to be redrawn
        // this.canvas.renderAll(); // Refresh the canvas

        const fullgroup = new fabric.Group([phoneInstance, group], {
          left: left,
          top: top,

        });
        this.canvas.add(fullgroup);
      };
    }

    // const phoneBody = new fabric.Rect({
    //   left: left - 5,
    //   top: top - 5,
    //   width: width,
    //   height: height,
    //   rx: cornerRadius,
    //   ry: cornerRadius,
    //   fill: 'white',
    //   stroke: '#ccc',
    //   strokeWidth: 5,
    //   shadow: new fabric.Shadow({
    //     color: 'rgba(0, 0, 0, 0.2)', // Shadow color
    //     blur: 10, // Blur level
    //     offsetX: 3, // Horizontal offset
    //     offsetY: 3, // Vertical offset
    //     affectStroke: true, // If true, it also affects the object's stroke
    // }),
    // });


  }

  MockupFront11(left: number, top: number, width: number, height: number, screenshotUrl: string) {
    const cornerRadius = 30;  // Corner radius of the mockup
    const screenClip = this.createRoundedClipPath(left, top, +width - 25, + height - 10, cornerRadius);

    const phoneBody = new Image();
    phoneBody.src = 'assets/iphone-11.png'; // Path to your screenshot image

    phoneBody.onload = () => {
      const phoneInstance = new fabric.Image(phoneBody, {
        left: left,
        top: top,
        id: "saddasd",
        // skewX: 10,
        // angle: 10,
        selectable: false, // Prevent moving the image separately,
      });
      phoneInstance.scaleToWidth(this.mockupWidth)

      const imageObj = new Image();
      imageObj.src = screenshotUrl; // Path to your screenshot image

      imageObj.onload = () => {
        const imgInstance = new fabric.Image(imageObj, {
          left: left + 20,
          top: top + 30,
          id: 20,
          // skewX: 10,
          // angle: 10,
          selectable: false, // Prevent moving the image separately,
        });
        imgInstance.scaleToWidth(this.mockupWidth - 40)

        const group = new fabric.Group([screenClip, imgInstance], {
          left: left,
          top: top,
        });
        group.set({ id: "asdasd" });
        this.canvas.add(group);

        group.clipPath = screenClip;
        //group.clipPath.visible = false; // Hide the clipping path but keep it functional
        group.dirty = true; // Mark the group as needing to be redrawn
        // this.canvas.renderAll(); // Refresh the canvas

        const fullgroup = new fabric.Group([group, phoneInstance], {
          left: left,
          top: top,
        });
        this.canvas.add(fullgroup);
      };
    }

    // const phoneBody = new fabric.Rect({
    //   left: left - 5,
    //   top: top - 5,
    //   width: width,
    //   height: height,
    //   rx: cornerRadius,
    //   ry: cornerRadius,
    //   fill: 'white',
    //   stroke: '#ccc',
    //   strokeWidth: 5,
    //   shadow: new fabric.Shadow({
    //     color: 'rgba(0, 0, 0, 0.2)', // Shadow color
    //     blur: 10, // Blur level
    //     offsetX: 3, // Horizontal offset
    //     offsetY: 3, // Vertical offset
    //     affectStroke: true, // If true, it also affects the object's stroke
    // }),
    // });


  }


  richtext(left: number, top: number, width: number, fontSize: number, textBody: string) {
    var loremIpsumDolor = new fabric.Textbox(textBody, {
      fontFamily: 'Assistant',
      textAlign: "center",
      width: width,
      fontSize: fontSize,
      top: top,
      left: left,
      fontWeight: 600
    });
    console.log(loremIpsumDolor)
    this.canvas.add(loremIpsumDolor);
  }

  addTextToFabric(left: number, top: number, width: number, fontSize: number, textBody: string) {
    // Create an invisible div to hold the quill content
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.innerHTML = textBody;
    document.body.appendChild(div);

    // Convert the HTML content to an image using html2canvas
    html2canvas(div).then((canvasEl) => {
      const imgInstance = new fabric.Image(canvasEl, {
        left: left,
        top: top
      });
      this.canvas.add(imgInstance);
      document.body.removeChild(div);  // Clean up the invisible div
    });
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

  showLayers(layersList: Array<any>) {
    layersList.forEach(element => {
      if (element.type === "richText") {
        this.addTextToFabric(element.left, element.top, element.width, element.fontSize, element.bodyText)
      } else if (element.type === "mockup") {
        this.MockupFront11(element.left, element.top, element.width, element.height, element.screenshotUrl)
      } else if (element.type === "background") {
        const phoneBody = new Image();
        phoneBody.src = element.screenshotUrl; // Path to your screenshot image

        phoneBody.onload = () => {
          const phoneInstance = new fabric.Image(phoneBody, {
            left: 0,
            top: 0,
            id: "saddasd",
            // skewX: 10,
            // angle: 10,
            selectable: false, // Prevent moving the image separately,
          });
          phoneInstance.scaleToWidth(this.canvas.getWidth())
          this.canvas.add(phoneInstance)
        }
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['height'] && this.height) {
      if (this.fabricCanvas) {
        this.canvas = new fabric.Canvas(this.fabricCanvas.nativeElement, {
          width: this.height * this.aspectRatio,
          height: this.height
        });
        const scaleFactor = window.devicePixelRatio || 1;
        this.applyRetinaScaling(1);
        this.setupSelectionEvents();

      }
    }
  }

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

  tojson() {
    console.log(this.canvas.toJSON())
  }

  private setupSelectionEvents(): void {
    // Listen for when an object is selected
    this.canvas?.on('selection:created', (event: any) => {
      const selectedObject = event.selected ? event.selected[0] : null;
      console.log(event.selected)
      console.log('Object selected:', selectedObject);

      if (selectedObject && selectedObject.type === 'group') {
        const selectedGroup = selectedObject as fabric.Group & { id: string }; // Type assertion
        console.log('Selected group ID:', selectedGroup.id); // Access the custom 'id'
      }

      // Check if multiple objects are selected
      if (this.canvas?.getActiveObjects().length > 1) {
        console.log('Multiple objects selected:', this.canvas.getActiveObjects());
      } else {
        console.log('Single object selected:', selectedObject);
      }
    });

    // Listen for when the selection is updated (useful for multi-select)
    this.canvas?.on('selection:updated', (event: any) => {
      const selectedObject = event.target;
      console.log('Selection updated, object selected:', selectedObject);
    });

    // Listen for when the selection is cleared (nothing is selected)
    this.canvas?.on('selection:cleared', () => {
      console.log('No object is selected.');
    });
  }
}
