import { Component, signal, inject } from '@angular/core';
import { App } from './app/app'
import { AppWindow } from './app-window/app-window'
import { AppServices } from './app-services'

@Component({
  selector: 'app-desktop',
  imports: [App, AppWindow],
  templateUrl: './desktop.html',
  styleUrl: './desktop.scss'
})
export class Desktop {
  appService = inject(AppServices);

  openApp(AppName: string)
  {
    this.appService.openApp({appName: AppName, appId:Date.now()});
  }
}
