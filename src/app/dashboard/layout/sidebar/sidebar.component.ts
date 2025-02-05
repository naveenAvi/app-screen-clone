
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { ImportsModule } from '../../imports';
import { QuillModule } from 'ngx-quill'
import Quill from 'quill';
import { FormControl } from '@angular/forms';
import { SharedDataService } from '../../../shared-data.service';
import { Output, EventEmitter } from '@angular/core';
import { ElementType } from '../../../Modals/ElementType';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ImportsModule, QuillModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  @Output() sidebarEvent = new EventEmitter<boolean>();
  @Input() control: FormControl

  mockupModel: any[]
  mockupdisplay: any[]
  stateOptions: any[] = [{ label: 'No Shadow', value: 'one-way' }, { label: 'Add Shadow', value: 'return' }];

  sidebarVisible: boolean = false;
  selectedElement: ElementType

  private quillEditor: QuillModule;
  quill: any
  QuillConfiguration: any = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ 'align': [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ],
  }

  private changeTimeout: any;


  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  constructor(private sharedService: SharedDataService) {

  }

  ngOnInit(): void {
    this.control = this.control ?? new FormControl()

    //this.sharedService.changeValue()
    this.sharedService.selectedItemValue.subscribe((selectedItem: any) => {
      if (selectedItem._otype === "group") {
        //finding the id
        const candidateID = selectedItem._objects[0].id
        if (candidateID) {
          console.log("element", this.sharedService.getLayerList().find(item => item.id === candidateID))
          this.selectedElement = this.sharedService.getLayerList().find(item => item.id === candidateID)
          console.log(this.selectedElement)
        }

      } else {
        console.log("selected", this.sharedService.getLayerList(), selectedItem)
        console.log("element", this.sharedService.getLayerList().find(item => item.id === (selectedItem as any).id))
        this.selectedElement = this.sharedService.getLayerList().find(item => item.id === (selectedItem as any).id)
        console.log(this.selectedElement)
      }
      this.sidebarToggle()
    })

    this.mockupModel = [
      { name: 'iphone 6', code: 'ip6' },
      { name: 'iphone 8', code: 'ip8' },
      { name: 'iphone 11', code: 'ip11' },
      { name: 'iphone 12', code: 'ip12' },
      { name: 'iphone 16', code: 'ip16' }
    ];
    this.mockupdisplay = [
      { name: 'Device Front', code: 'devfron' },
      { name: '3d left', code: '3dleft' },
      { name: '3d right', code: '3dright' },
      { name: 'single border', code: 'sborder' },
      { name: 'double border', code: 'dborder' },

    ]
  }

  changeText() {
    if (this.changeTimeout) {
      clearTimeout(this.changeTimeout);
    }

    // Set a new timeout
    this.changeTimeout = setTimeout(() => {
      // Only the last change will reach here
      this.sharedService.changeLayerProperty(2, "bodyText", this.control.value)

    }, 700); // Adjust the delay as needed
  }


  ngAfterViewInit(): void {
    this.quill = new Quill('#editorcontainer', {
      modules: {
        toolbar: {
          container: '#toolbar-toolbar'
        }
      },
      theme: 'snow'
    });
  }

  sidebarToggle() {
    this.sidebarVisible = !this.sidebarVisible
    this.sidebarEvent.emit(this.sidebarVisible);
  }

  shadowXupdate(axis: string, value: string | number) {
    console.log(value)
    this.sharedService.changeLayerProperty(this.selectedElement.id, axis, value)
  }
}
