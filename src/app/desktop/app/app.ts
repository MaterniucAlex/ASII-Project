import { Component, input, inject } from '@angular/core';
import { AppServices } from '../app-services'

@Component({
  selector: 'app-app',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  appIcon = input("assets/img/defaultAppPic.png");
  appName = input("App");

  appService = inject(AppServices);

}
