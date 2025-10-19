import { Component, input, signal, inject, OnInit } from '@angular/core';
import { AppServices } from '../app-services'
import type AppData from '../../../types/AppData'
import { Notepad } from '../notepad/notepad'
import { Calculator } from '../calculator/calculator'
import { Calendar } from '../calendar/calendar';

@Component({
  selector: 'app-app',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  appService = inject(AppServices);

  appName = input("");

  appData = signal<AppData>({
    appId: Date.now(),
    appName: this.appName(),
    appIcon: '',
    appContent: null
  });

  ngOnInit()
  {
    this.appData().appName = this.appName();
    this.appData().zIndex = 0;

    switch (this.appName()) {
      case 'Notepad':
        this.appData().appIcon = 'assets/img/defaultAppPic.png';
        this.appData().appContent = Notepad;
      break;

      case 'Calculator':
        this.appData().appIcon = 'assets/img/defaultAppPic.png';
        this.appData().appContent = Calculator;
      break;

      case 'Calendar':
        this.appData().appIcon = 'assets/img/defaultAppPic.png';
        this.appData().appContent = Calendar;
      break;

      default:
        this.appData().appIcon = 'assets/img/defaultAppPic.png';
        this.appData().appContent = null;
      break;
    }
  }

  openApp()
  {
    this.appData().appId = Date.now();
    this.appService.openApp(this.appData());
  }
}
