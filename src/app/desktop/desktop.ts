import { Component, signal, inject } from '@angular/core';
import { App } from './app/app'
import { AppWindow } from './app-window/app-window'
import { Taskbar } from './taskbar/taskbar'
import { AppServices } from './app-services'


import type AppData from '../../types/AppData'

@Component({
  selector: 'app-desktop',
  imports: [App, AppWindow, Taskbar],
  templateUrl: './desktop.html',
  styleUrl: './desktop.scss'
})
export class Desktop {
  appService = inject(AppServices);

  openAppMenu(){
    
  }

  // Toggle app visibility for all visible/invisible apps 
  hideAllApps(){
    const activeApps = this.appService.openedAppsList();
    let existsVisibleApp: boolean = activeApps.some(app => app.display !== 'none');

    if(existsVisibleApp){
      const selectedApps = activeApps.filter(app => app.display !== 'none');
      selectedApps.forEach( app => {this.appService.toggleAppVisibility(app.appId)});
    }
    else{
      activeApps.forEach( app => {this.appService.toggleAppVisibility(app.appId)});
    }
  } 
  
  goBack(){

  }
}
