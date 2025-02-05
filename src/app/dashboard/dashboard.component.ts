import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { CanvasComponent } from '../canvas/canvas.component';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeadbarComponent } from './layout/headbar/headbar.component';
import { SinglescreenComponent } from './displayarea/singlescreen/singlescreen.component';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../shared-data.service';
import { mockupImageType } from '../Modals/mockupImageType';
import { ElementType } from '../Modals/ElementType';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeadbarComponent, SinglescreenComponent, CardModule, SidebarModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})

export class DashboardComponent implements OnInit {
  @ViewChild('canvasHolder') canvasHolder: ElementRef<HTMLDivElement> | undefined

  sidebarOpened: boolean = false


  aspectRatio: number = 1290 / 2796
  height: number = 0
  width: number = 0

  allscreenLayers: any

  constructor(private sharedService: SharedDataService) {

  }

  ngOnInit(): void {
    const phonemockup: ElementType = {
      id: "1", 
      type: "mockup",
      screenid:1,
      phonecategory: "iphone12",
      screenshotUrl: "assets/iosphone67island_1.png",
      top: 141,
      left: 27,
      width: 250,
      height: 500,
      valign: "center",
      halign: "bottom",
      marginBottom:10
    }
    const phonemockup6: ElementType = {
      id: "2", 
      type: "mockup",
      screenid:2,
      phonecategory: "iphone7",
      screenshotUrl: "assets/thumbnail_image0.png",
      top: 141,
      left: 27,
      width: 250,
      height: 500,
      valign: "center",
      halign: "bottom",
      marginBottom:10,
      hasShadow:true
    }
    const background: ElementType = {
      id: "3", 
      screenid:1,
      type: "background",
      screenshotUrl: "assets/download.jfif",
    }
    const background2: ElementType = {
      id: "4", 
      screenid:2,
      type: "background",
      screenshotUrl: "assets/download.jfif",
    }

    const text1: ElementType = {
      id: "5", 
      screenid:2,
      type: "richText",
      fontSize:26,
      text:"hello world",
      valign:"center",
      marginTop:20,
      halign:"top"
    }


    this.allscreenLayers = [
      // { type: "background", data: { id: 0, type: "background", screenshotUrl: "assets/download.jfif" } },
      background,
      background2,
       phonemockup,
      phonemockup6,
      text1
      // { type: "richText", data: { id: 2, type: "richText", bodyText: "Hello World!", top: 38, left: 10, width: 300, fontSize: 26 } },
    ]

   
    this.sharedService.setLayerList(this.allscreenLayers);

  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.canvasHolder) {
        this.height = this.canvasHolder.nativeElement.offsetHeight - 20
        this.width = this.height * this.aspectRatio
        console.log(this.canvasHolder.nativeElement.offsetHeight)
      }
    }, 0);

  }

  toggleSidebar(toggleState:boolean) {
    this.sidebarOpened = toggleState
  }
}
