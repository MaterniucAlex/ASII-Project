import { Component, inject } from '@angular/core';
import { App } from '../app/app'
import { AspectService } from '../aspect-service';

@Component({
  selector: 'app-start-menu',
  imports: [App],
  templateUrl: './start-menu.html',
  styleUrl: './start-menu.scss'
})
export class StartMenu {

  aspectService = inject(AspectService);

  toggleDarkMode()
  {
    this.aspectService.toggleDarkMode();
  }

  powerOff()
  {
    this.aspectService.powerOff();
  }
}
