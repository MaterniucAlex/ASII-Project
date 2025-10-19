import { Component, signal, inject } from '@angular/core';
import { App } from './app/app'
import { AppWindow } from './app-window/app-window'
import { AppServices } from './app-services'
import { Notepad } from './notepad/notepad'
import { Calculator } from './calculator/calculator'

import type AppData from '../../types/AppData'

@Component({
  selector: 'app-desktop',
  imports: [App, AppWindow],
  templateUrl: './desktop.html',
  styleUrl: './desktop.scss'
})
export class Desktop {
  appService = inject(AppServices);
}
