import { Injectable } from '@angular/core';
import * as fabric from 'fabric';
import html2canvas from 'html2canvas';
import { mockupImageType } from '../Modals/mockupImageType';
import { ElementType } from '../Modals/ElementType';

@Injectable({
  providedIn: 'root'
})
export class DisplayComponentsService {
  mockupWidth: number = 300
  canvasWidth: number = 300
  canvasHeight: number = 600
  scaleFactor: number = 1
  rationFactor: number = 1

  constructor() { }


  background(mockupImageData: ElementType): Promise<fabric.Image> {
    return new Promise((resolve, reject) => {
      const backgroundIMG = new Image();
      backgroundIMG.src = mockupImageData.screenshotUrl; // Path to your screenshot image

      backgroundIMG.onload = () => {
        const bgIMGInstance = new fabric.Image(backgroundIMG, {
          left: 0,
          top: 0,
          id: "saddasd",
          // skewX: 10,
          // angle: 10,
          selectable: false, // Prevent moving the image separately,
        });
        bgIMGInstance.scaleToWidth(this.canvasWidth)

        return resolve(bgIMGInstance);
      }
      backgroundIMG.onerror = reject
    })

  }
  MockupFront11(mockupImageData: ElementType): Promise<fabric.Group> {
    const mockupWidthRatioed = mockupImageData.width * this.rationFactor
    return new Promise((resolve, reject) => {
      const cornerRadius = 30 * this.scaleFactor;  // Corner radius of the mockup

      const phoneBody = new Image();
      phoneBody.src = 'assets/iphone-11.png'; // Path to your screenshot image

      phoneBody.onload = () => {
        const phoneInstance = new fabric.Image(phoneBody, {
          left: 0,
          top: 0,
          id: "saddasd",
          // skewX: 10,
          // angle: 10,
          selectable: false, // Prevent moving the image separately,
        });
        phoneInstance.scaleToWidth(mockupWidthRatioed)

        const imageObj = new Image();
        imageObj.src = mockupImageData.screenshotUrl; // Path to your screenshot image

        imageObj.onload = () => {
          const imgInstance = new fabric.Image(imageObj, {
            left: 0,
            top: 0,
            id: 20,
            // skewX: 10,
            // angle: 10,
            selectable: false,
          });
          imgInstance.scaleToWidth(mockupWidthRatioed - (17 * (this.rationFactor)))
          const screenClip = this.createRoundedClipPath(0, 0, imgInstance.getScaledWidth(), imgInstance.getScaledHeight() - 1, cornerRadius);

          const group = new fabric.Group([screenClip, imgInstance], {
            left: 10,
            top: 10,
          });

          group.set({ id: "asdasd" });
          //this.canvas.add(group);
          group.clipPath = screenClip;
          //group.clipPath.visible = false; // Hide the clipping path but keep it functional
          group.dirty = true; // Mark the group as needing to be redrawn
          //resolve(group);


          // this.canvas.renderAll(); // Refresh the canvas

          const fullgroup = new fabric.Group([group, phoneInstance], {
            left: 0,
            top: 0,
            shadow: new fabric.Shadow({
              color: 'rgba(0, 0, 0, 0.4)', // Shadow color
              blur: 10, // Blur level
              offsetX: 5, // Horizontal offset
              offsetY: 5, // Vertical offset
              affectStroke: true, // If true, it also affects the object's stroke
            }),
          });
          // const marginLeft = (this.canvasWidth - fullgroup.getScaledWidth()) / 2
          // fullgroup.left = marginLeft
          mockupImageData.element = fullgroup
          fullgroup.left = this.getAlignV(mockupImageData)
          fullgroup.top = this.getAlignH(mockupImageData)
          // console.log(fullgroup.left , (this.canvasWidth - fullgroup.getScaledWidth()) / 2)
          resolve(fullgroup);
        };
        imageObj.onerror = reject;
      }
      phoneBody.onerror = reject;
    })

  }
  Mockup6(mockupImageData: ElementType): Promise<fabric.Group> {
    const mockupWidthRatioed = mockupImageData.width * this.rationFactor
    return new Promise((resolve, reject) => {
      const cornerRadius = 30;  // Corner radius of the mockup

      const phoneBody = new Image();
      phoneBody.src = 'assets/iphone-6.PNG'; // Path to your screenshot image

      phoneBody.onload = () => {
        const phoneInstance = new fabric.Image(phoneBody, {
          left: 0,
          top: 0,
          id: mockupImageData.id,
          // skewX: 10,
          // angle: 10,
          selectable: false, // Prevent moving the image separately,
        });
        phoneInstance.scaleToWidth(mockupWidthRatioed)

        const imageObj = new Image();
        imageObj.src = mockupImageData.screenshotUrl; // Path to your screenshot image

        imageObj.onload = () => {
          const imgInstance = new fabric.Image(imageObj, {
            left: 10,
            top: 35,
            id: mockupImageData.id,
            // skewX: 10,
            // angle: 10,
            selectable: false, // Prevent moving the image separately,
          });

          imgInstance.scaleToWidth(mockupWidthRatioed - (26 * this.rationFactor))
          imgInstance.left = (phoneInstance.getScaledWidth() - imgInstance.getScaledWidth()) / 2
          imgInstance.top = (phoneInstance.getScaledHeight() - imgInstance.getScaledHeight()) / 2

          const fullgroup = new fabric.Group([imgInstance, phoneInstance,], {
            left: 0,
            top: 0
          });
          if (mockupImageData.hasShadow) {
            const shadow = new fabric.Shadow({
              color: 'rgba(0, 0, 0, 0.4)', // Shadow color
              blur: 10, // Blur level
              offsetX: mockupImageData.offsetX, // Horizontal offset
              offsetY: mockupImageData.offsetY, // Vertical offset
              affectStroke: true, // If true, it also affects the object's stroke
            })
            fullgroup.shadow = shadow
          }

          mockupImageData.element = fullgroup
          fullgroup.left = this.getAlignV(mockupImageData)
          fullgroup.top = this.getAlignH(mockupImageData)
          resolve(fullgroup);
        };
        imageObj.onerror = reject
      }
      phoneBody.onerror = reject
    })

  }

  addTextToFabric(richtextData: ElementType): Promise<fabric.Image> {
    return new Promise((resolve, reject) => {
      // Create an invisible div to hold the quill content
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.backgroundColor = 'transparent';
      div.innerHTML = richtextData.text;
      document.body.appendChild(div);

      html2canvas(div, {
        backgroundColor: null,
        scale: 2
      }).then((canvasEl) => {
        const imgInstance = new fabric.Image(canvasEl, {
          left: richtextData.left,
          top: richtextData.top,
          selectable: true,
          evented: true,
          id: richtextData.id
        });
        //this.canvas.add(imgInstance);
        document.body.removeChild(div);  // Clean up the invisible div
        richtextData.element = imgInstance
        imgInstance.left = this.getAlignV(richtextData)
        imgInstance.top = this.getAlignH(richtextData)
        resolve(imgInstance);
      }).catch(() => { reject("error") });
    })
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
    return loremIpsumDolor
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

  setscaleFactor(scaleFactor: number, canvasWidth: number, canvasHeight: number) {
    this.scaleFactor = scaleFactor
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.rationFactor = this.canvasWidth / this.mockupWidth
  }

  getAlignH(element: ElementType) {
    switch (element.halign) {
      case "center":
        return (this.canvasWidth - element.element.getScaledWidth()) / 2
      case "bottom":
        return (this.canvasHeight - element.element.getScaledHeight()) - (element.marginBottom || 0)
        break;
      case "top":
        return element.marginTop || 0
        break;
      case "none":
        return element.marginTop
        break;
      default:
        return 0;
        break;
    }
  }

  getAlignV(element: ElementType) {
    switch (element.valign) {
      case "center":
        return (this.canvasWidth - element.element.getScaledWidth()) / 2
      case "left":
        return element.marginLeft || 0
        break;
      case "right":
        return element.marginRight + element.element.getScaledWidth()
        break;
      case "none":
        return element.left;
      default:
        return 0
        break;
    }
  }

}
