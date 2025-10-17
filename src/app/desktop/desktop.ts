import { Component, signal, inject } from '@angular/core';
import { App } from './app/app'
import { AppWindow } from './app-window/app-window'
import { Notepad } from './notepad/notepad'
import { AppServices } from './app-services'

@Component({
  selector: 'app-desktop',
  imports: [App, AppWindow, Notepad],
  templateUrl: './desktop.html',
  styleUrl: './desktop.scss'
})
export class Desktop {
  appService = inject(AppServices);

  appId = signal(0);

  openApp()
  {
    this.appService.openApp(this.appId());
    this.appId.update(val => val+1);
  }
}
