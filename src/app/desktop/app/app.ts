import { Component, HostListener, input, signal, inject, OnInit, computed } from '@angular/core';
import { NgStyle } from '@angular/common';
import { AppServices } from '../app-services'
import { AspectService } from '../aspect-service'
import type AppData from '../../../types/AppData'
import { Notepad } from '../notepad/notepad'
import { Calculator } from '../calculator/calculator'
import { Calendar } from '../calendar/calendar';

@Component({
  selector: 'app-app',
  imports: [NgStyle],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  appService = inject(AppServices);
  aspectService = inject(AspectService);

  appName = input("");

  appLoc = computed(() => {
    return {
      'left.px': this.appX(),
      'top.px':  this.appY()
    };
  })

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
        this.appData().appIcon = 'assets/img/notepad.png';
        this.appData().appContent = Notepad;
      break;

      case 'Calculator':
        this.appData().appIcon = 'assets/img/calculator.png';
        this.appData().appContent = Calculator;
      break;

      case 'Calendar':
        this.appData().appIcon = 'assets/img/calendar.png';
        this.appData().appContent = Calendar;
      break;

      default:
        this.appData().appIcon = 'assets/img/defaultAppPic.png';
        this.appData().appContent = null;
      break;
    }

    let appPos: {appX: number, appY: number} = this.aspectService.getNextAppPos();
    this.appX.set(appPos.appX);
    this.appY.set(appPos.appY);
  }

  openApp()
  {
    if (this.isDragging()) return;
    this.appData().appId = Date.now();
    this.appService.openApp(this.appData());
  }

  isDragging = signal(false);

  appX = signal(0);
  appY = signal(0);

  startDrag(event: MouseEvent)
  {
    event.preventDefault();
    this.isDragging.set(true);
  }

  @HostListener("window:mousemove", ["$event"])
  onMouseMove(event: MouseEvent)
  {
    if (this.isDragging() === false)
      return;

    this.appX.set(event.clientX - 40)
    this.appY.set(event.clientY - 40)

    console.log(this.appX());

  }

  @HostListener("window:mouseup", ["$event"])
  onMouseUp(event: MouseEvent)
  {
    this.isDragging.set(false);
  }
}
