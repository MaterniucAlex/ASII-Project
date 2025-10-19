import { Component, inject } from '@angular/core';
import { StartApp } from './start-app/start-app'
import { AspectService } from '../aspect-service';

@Component({
  selector: 'app-start-menu',
  imports: [StartApp],
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
