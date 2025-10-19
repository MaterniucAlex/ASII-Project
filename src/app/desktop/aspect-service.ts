import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AspectService {

  wallpaper = signal('assets/img/wallpaper.png');
  display = signal('content');

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
    this.display.set('none');
  }

}
