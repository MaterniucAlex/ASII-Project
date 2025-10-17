import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Desktop } from './desktop/desktop'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Desktop],
  template: `
    <app-desktop />

    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('ASII-Project');
}
