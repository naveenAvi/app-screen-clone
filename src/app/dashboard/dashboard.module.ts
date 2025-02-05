import { Component, NgModule, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ImportsModule } from './imports';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenubarModule,
    BadgeModule, 
    AvatarModule, 
    InputTextModule, 
    RippleModule, 
    CommonModule,
    ImportsModule,
    SidebarComponent,
    SidebarModule,
    QuillModule.forRoot()
  ]
})
export class DashboardModule { }
