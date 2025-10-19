import { Injectable, signal, inject } from '@angular/core';
import { AppServices } from './app-services';

@Injectable({
  providedIn: 'root'
})
export class AspectService {

  appService = inject(AppServices);

  wallpaper = signal('assets/img/wallpaper.png');
  screenOpacity = signal(100);

  nextAppX = signal(20);
  nextAppY = signal(80);

  nextWindowX = signal(80);
  nextWindowY = signal(80);

  getNextAppPos(): {appX: number, appY: number}
  {
    let appOffset = 120;
    let pos = {
      appX: this.nextAppX(),
      appY: this.nextAppY()
    };
    this.nextAppY.update((val) => (val + appOffset < window.innerHeight ? val + appOffset : 80));
    this.nextAppX.update((val) => (this.nextAppY() == appOffset ? val + appOffset : val));

    return pos;
  }

  getNextWindowPos(): {winX: number, winY: number}
  {
    if(this.appService.isMobile)
    {
      return {winX: 0, winY: 0};
    }
    let windowOffset = 30;
    let pos = {
      winX: this.nextWindowX(),
      winY: this.nextWindowY()
    };
    this.nextWindowY.update((val) => (val + windowOffset));
    this.nextWindowX.update((val) => (val + windowOffset));

    return pos;
  }

  subNextWindowPos()
  {
    let windowOffset = 30;
    this.nextWindowY.update((val) => (val - windowOffset));
    this.nextWindowX.update((val) => (val - windowOffset));
  }

  toggleDarkMode()
  {
    console.log(this.wallpaper());

    if (this.wallpaper() == 'assets/img/wallpaper.png')
      this.wallpaper.set('assets/img/wallpaperNight.jpg');
    else
      this.wallpaper.set('assets/img/wallpaper.png');
  }

  powerOff()
  {
    this.screenOpacity.set(0);
  }

}
