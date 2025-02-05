import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as fabric from 'fabric';
import { SharedDataService } from '../../../shared-data.service';
import html2canvas from 'html2canvas';
import { DisplayComponentsService } from '../../../services/display-components.service';
import { ElementType } from '../../../Modals/ElementType';

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
  @Input() screenid: number


  canvas: fabric.Canvas | undefined;
  aspectRatio: number = 1290 / 2796

  private mockupWidth = 304;
  private mockupHeight = 600;

  constructor(private sharedService: SharedDataService, private displayComponent: DisplayComponentsService) {

  }
  ngOnInit(): void {
    this.sharedService.LayersListValue.subscribe(value => {
      console.log("from app screen", value)
      this.canvas.clear()
      this.showLayers(value.filter((item: ElementType) => item.screenid === this.screenid));
    });
  }

  showLayers(layersList: Array<any>) {
    layersList.forEach((element: ElementType) => {
      if (element.type === "richText") {
        const richTextImage: Promise<fabric.Image> = this.displayComponent.addTextToFabric(element)
        richTextImage.then(value => {
          this.canvas.add(value)
        })
      } else if (element.type === "mockup") {
        if (element.phonecategory === "iphone12") {
          const fullgroup: Promise<fabric.Group> = this.displayComponent.MockupFront11(element)
          fullgroup.then(value => {
            this.canvas.add(value)
          })
        } else if (element.phonecategory === "iphone7") {
          const fullgroup: Promise<fabric.Group> = this.displayComponent.Mockup6(element)
          fullgroup.then(value => {
            this.canvas.add(value)
          })
        }
        // const fullgroup: Promise<fabric.Group> = this.displayComponent.MockupFront11(element)

      } else if (element.type === "background") {
        const bgImgFabric: Promise<fabric.Image> = this.displayComponent.background(element)
        bgImgFabric.then(value => {
          this.canvas.add(value)
        });
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
        this.displayComponent.setscaleFactor(scaleFactor, this.canvas.getWidth(), this.canvas.getHeight())
      }
    }
  }

  applyRetinaScaling(scaleFactor: number) {
    if (this.canvas && this.fabricCanvas) {
      // Get the current width and height
      const canvasWidth = this.canvas.getWidth();
      const canvasHeight = this.canvas.getHeight();

      this.mockupWidth = canvasWidth * 0.8

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
        selectedObject._otype = "group"
        this.sharedService.setSelectedItem(selectedObject)
      } else {
        selectedObject._otype = "object"
        this.sharedService.setSelectedItem(selectedObject)
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
