import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Desktop } from './desktop/desktop'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Desktop],
  template: `

    <img src="favicon.png" id="logo">
    <h2 id="logoTitle">NeroOS</h2>
    <app-desktop />

    <router-outlet />
  `,
  styles: [],
})
export class App { }
