import * as fabric from 'fabric';
export class ElementType {
    //common properties
    id?: string;
    screenid?: number;
    type: "mockup" | "background" | "richText";
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    valign?: 'none' | 'center' | 'left' | 'right';
    halign?: 'none' | 'center' | 'bottom' | 'top';

    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;

    //mockup properties
    screenshotUrl?: string;
    phonecategory?: string;

    //image properties
    imagesize?: string; // fullsize = full background image

    text?: string;
    fontSize?: number;

    //shadow properties
    hasShadow?:boolean;
    offsetX?:number;
    offsetY?:number;
    shadowColor?:string;

    element?: fabric.Group | fabric.Textbox | fabric.Image
}