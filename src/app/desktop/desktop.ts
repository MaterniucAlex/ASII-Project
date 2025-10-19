import { Component, signal, inject } from '@angular/core';
import { App } from './app/app'
import { AppWindow } from './app-window/app-window'
import { Taskbar } from './taskbar/taskbar'
import { AppServices } from './app-services'
import { AspectService } from './aspect-service'

import type AppData from '../../types/AppData'

@Component({
  selector: 'app-desktop',
  imports: [App, AppWindow, Taskbar],
  templateUrl: './desktop.html',
  styleUrl: './desktop.scss'
})
export class Desktop {
  appService = inject(AppServices);
  aspectService = inject(AspectService);
}
