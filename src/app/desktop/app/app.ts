import { Component, HostListener, input, signal, inject, OnInit, computed } from '@angular/core';
import { NgStyle } from '@angular/common';
import { AppServices } from '../app-services'
import { AspectService } from '../aspect-service'
import type AppData from '../../../types/AppData'
import { Notepad } from '../notepad/notepad'
import { Calculator } from '../calculator/calculator'
import { Calendar } from '../calendar/calendar';
import { FileExplorer } from '../file-explorer/file-explorer';

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

    this.appData().appIcon = 'assets/img/defaultAppPic.png';
    this.appData().appContent = null;

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

      case 'FileExplorer':
       this.appData().appIcon = 'assets/img/Folder.png';
        this.appData().appContent = FileExplorer;
      break;

      default:
      break;
    }

    let appPos: {appX: number, appY: number} = this.aspectService.getNextAppPos();
    this.appX.set(appPos.appX);
    this.appY.set(appPos.appY);
  }

  openApp()
  {
    this.appData().appId = Date.now();
    this.appService.openApp(this.appData());
  }

  isDragging = signal(false);

  appX = signal(0);
  appY = signal(0);

  startDrag(event: MouseEvent)
  {
    if(this.appService.isMobile) return;

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

  }

  @HostListener("window:mouseup", ["$event"])
  onMouseUp(event: MouseEvent)
  {
    this.isDragging.set(false);

    if (this.appY() > window.innerHeight - 120)
      this.appY.set(window.innerHeight - 80)
    if (this.appY() < 80)
      this.appY.set(80);
    if (this.appX() < 0)
      this.appX.set(0);
    if (this.appX() + 80 > window.innerWidth)
      this.appX.set(window.innerWidth - 80);
  }
}
