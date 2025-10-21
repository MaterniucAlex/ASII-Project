import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { AppWindow } from './app-window/app-window';
import type AppData from '../../types/AppData'

@Injectable({
  providedIn: 'root'
})
export class AppServices {

  openedAppsList = signal<Array<AppData>>([]);

   openApp(app: AppData)
  {
    this.openedAppsList.update((apps) => {
      
      // 1. Verifică dacă aplicația este Notepad ȘI deschide un fișier existent
      if (app.appName === 'Notepad' && app.fileId) {
        
        // Caută o instanță existentă a ACELUI fișier
        const existingApp = apps.find(x => x.appName === app.appName && x.fileId === app.fileId);

        if (existingApp) {
          // Fișierul este deja deschis. Doar îl focusăm și oprim deschiderea uneia noi.
          this.focusApp(existingApp.appId);
          return apps; 
        }
      }
      
      // 2. Dacă nu este un fișier deja deschis (sau dacă este altă aplicație), deschide o instanță nouă.
      const newApps = [...apps, app];
      this.focusApp(app.appId);
      return newApps;
    });
  }

 // openApp(app: AppData)
  //{
   // this.openedAppsList.update((apps) => [...apps, app]);
   // this.focusApp(app.appId);
  //}

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
