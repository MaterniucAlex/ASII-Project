import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServices {

  openedAppsList = signal<Array<number>>([]);

  openApp(id: number)
  {
    this.openedAppsList.update((apps) => [...apps, id]);
  }

  closeApp(id: number)
  {
    this.openedAppsList.update((apps) => apps.filter(x => x != id));
  }

}
