import { Component, signal, inject } from '@angular/core';
import { AppServices } from '../app-services'

@Component({
  selector: 'app-taskbar',
  imports: [],
  templateUrl: './taskbar.html',
  styleUrl: './taskbar.scss'
})
export class Taskbar {
  appService = inject(AppServices);

  toggleApp(appId: number)
  {
    this.appService.toggleAppVisibility(appId);
  }
}
