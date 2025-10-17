import { Component, HostListener , signal, input, inject, ViewContainerRef } from '@angular/core';
import { AppServices } from '../app-services'

@Component({
  selector: 'app-app-window',
  imports: [],
  templateUrl: './app-window.html',
  styleUrl: './app-window.scss'
})
export class AppWindow {

  appService = inject(AppServices);
  windowId = input(0);

  windowX = signal(0);
  windowY = signal(0);

  offsetX = signal(0);
  offsetY = signal(0);

  isDragging = signal(false);

  closeWindow()
  {
    this.appService.closeApp(this.windowId());
  }

  startDrag(event: MouseEvent) {

    event.preventDefault();

    this.offsetX.set(this.windowX() - event.clientX);
    this.offsetY.set(this.windowY() - event.clientY);

    this.isDragging.set(true);
  }

  @HostListener("window:mousemove", ["$event"])
  onMouseMove(event: MouseEvent)
  {

    if (this.isDragging() === false)
      return;

    this.windowX.set(event.clientX + this.offsetX())
    this.windowY.set(event.clientY + this.offsetY())
  }

  @HostListener("window:mouseup", ["$event"])
  onMouseUp(event: MouseEvent)
  {
    this.isDragging.set(false);
  }
}
