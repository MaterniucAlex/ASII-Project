import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { AppWindow } from './app-window/app-window';

@Injectable({
  providedIn: 'root'
})
export class AppServices {

  openedAppsList = signal<Array<{appName: string, appId: number, zIndex?: number}>>([]);

  openApp(app: {appName: string, appId: number, zIndex?: number})
  {
    this.openedAppsList.update((apps) => [...apps, app]);
    this.focusApp(app.appId);
  }

  closeApp(appId: number)
  {
    this.openedAppsList.update((apps) => apps.filter(x => x.appId !== appId));
  }

  focusApp(appId: number)
  {
    this.openedAppsList.update((apps) => {
      const maxZ = apps.reduce((m, a) => Math.max(m, a.zIndex ?? 0), 0);
      return apps.map(a => a.appId === appId ? {...a, zIndex: maxZ + 1}: a);
    })
  }
}
