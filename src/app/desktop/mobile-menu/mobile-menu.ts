import { Component, inject } from '@angular/core';
import { AppServices } from '../app-services';
import { Desktop } from '../desktop';

@Component({
  selector: 'app-mobile-menu',
  imports: [],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.scss'
})
export class MobileMenu {
  appService = inject(AppServices);
  desktop = inject(Desktop);

  toggleApp(appId: number)
  {
    if(this.appService.isMobile) {
      // Mobile: Close menu, focus app, show if hidden
      this.desktop.isMenuOpen.set(false);
      
      // Make sure the selected app is visible
      this.appService.openedAppsList.update(apps =>
        apps.map(app => ({
          ...app,
          display: app.appId === appId ? 'contents' : app.display
        }))
      );
      
      this.appService.focusApp(appId);
    } else {
      // Desktop: Just toggle visibility
      this.appService.toggleAppVisibility(appId);
    }
  }

  closeApp(appId: number)
  {
    this.appService.closeApp(appId);
  }
}
