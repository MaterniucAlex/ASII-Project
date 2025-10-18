import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { AppWindow } from './app-window/app-window';

@Injectable({
  providedIn: 'root'
})
export class AppServices {

  openedAppsList = signal<Array<{appName: string, appId: number}>>([]);

  openApp(app: {appName: string, appId: number})
  {
    this.openedAppsList.update((apps) => [...apps, app]);
  }

  closeApp(appId: number)
  {
    this.openedAppsList.update((apps) => apps.filter(x => x.appId !== appId));
  }

}
