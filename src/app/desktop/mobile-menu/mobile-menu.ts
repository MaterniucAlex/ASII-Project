import { Component, inject } from '@angular/core';
import { AppServices } from '../app-services';

@Component({
  selector: 'app-mobile-menu',
  imports: [],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.scss'
})
export class MobileMenu {
  appService = inject(AppServices);

  toggleApp(appId: number)
  {
    this.appService.toggleAppVisibility(appId);
  }
}
