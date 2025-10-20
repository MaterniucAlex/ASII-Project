import { Component, signal, inject, OnInit } from '@angular/core';
import { AppServices } from '../app-services'
import { StartMenu } from '../start-menu/start-menu'

@Component({
  selector: 'app-taskbar',
  imports: [StartMenu],
  templateUrl: './taskbar.html',
  styleUrl: './taskbar.scss'
})
export class Taskbar implements OnInit {
  appService = inject(AppServices);

  time = signal('12:00');

  ngOnInit()
  {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    this.time.set(h + ':' + (m < 10 ? '0' : '') + m);

    setInterval(() => {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      this.time.set(h + ':' + (m < 10 ? '0' : '') + m);
    }, 1000 * 30);
  }

  toggleApp(appId: number)
  {
    this.appService.toggleAppVisibility(appId);
  }
}
