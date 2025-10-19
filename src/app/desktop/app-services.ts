import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { signal } from '@angular/core';
import { AppWindow } from './app-window/app-window';
import type AppData from '../../types/AppData'

@Injectable({
  providedIn: 'root'
})
export class AppServices {

  openedAppsList = signal<Array<AppData>>([]);
  isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  openApp(app: AppData)
  {
    this.openedAppsList.update((apps) => [...apps, app]);
    this.focusApp(app.appId);
  }

  closeApp(appId: number)
  {
    this.openedAppsList.update((apps) => apps.filter(x => x.appId !== appId));
  }

  toggleAppVisibility(appId: number)
  {
    let foundApp = this.openedAppsList().find(app => app.appId = appId);
    if (foundApp)
    {
      if (foundApp.display == 'none')
        foundApp.display = 'contents';
      else
        foundApp.display = 'none';
    }

  }

  focusApp(appId: number)
  {
    this.openedAppsList.update((apps) => {
      const maxZ = apps.reduce((m, a) => Math.max(m, a.zIndex ?? 0), 0);
      return apps.map(a => a.appId === appId ? {...a, zIndex: maxZ + 1}: a);
    })
  }
}
