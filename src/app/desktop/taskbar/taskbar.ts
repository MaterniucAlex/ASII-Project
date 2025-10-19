import { Component, signal, inject, OnInit } from '@angular/core';
import { AppServices } from '../app-services'

@Component({
  selector: 'app-taskbar',
  imports: [],
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

    this.time.set(h + ':' + (m < 10 ? ' ' : '') +m);
  }

  toggleApp(appId: number)
  {
    this.appService.toggleAppVisibility(appId);
  }
}
