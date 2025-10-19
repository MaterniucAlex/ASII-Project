import { Component, signal, inject } from '@angular/core';
import { App } from './app/app'
import { AppWindow } from './app-window/app-window'
import { Taskbar } from './taskbar/taskbar'
import { AppServices } from './app-services'


import type AppData from '../../types/AppData'
import { MobileMenu } from './mobile-menu/mobile-menu';

@Component({
  selector: 'app-desktop',
  imports: [App, AppWindow, Taskbar, MobileMenu],
  templateUrl: './desktop.html',
  styleUrl: './desktop.scss'
})
export class Desktop {
  appService = inject(AppServices);
  isMenuOpen = signal(false);

  // Toggle mobile menu
  openAppMenu(){
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  // Toggle app visibility for all visible/invisible apps 
  toggleAllAppsVisibility(){
    const activeApps = this.appService.openedAppsList();
    const anyVisible = activeApps.some(app => app.display !== 'none');

    this.appService.openedAppsList.update(apps =>
      apps.map(a => ({ ...a, display: !anyVisible ? 'contents' : 'none' }))
    );
}
  
  // Hide topmost visible app
  goBack(){
    const activeApps = this.appService.openedAppsList();
    const visibleApps = activeApps.filter(app => app.display !== 'none');

    if (visibleApps.length === 0) return;

    const maxZ = visibleApps.reduce((m, a) => Math.max(m, a.zIndex ?? 0), 0);

    const topMostApp = activeApps.find(app => app.zIndex === maxZ);
    if(topMostApp){
      this.appService.toggleAppVisibility(topMostApp.appId);
    }
  }
}
