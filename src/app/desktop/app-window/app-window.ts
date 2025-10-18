import { Component, HostListener , signal, input, inject, ViewContainerRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppServices } from '../app-services'
import { Notepad } from '../notepad/notepad'
import { FileExplorer } from '../file-explorer/file-explorer'

@Component({
  selector: 'app-app-window',
  imports: [CommonModule],
  templateUrl: './app-window.html',
  styleUrl: './app-window.scss'
})
export class AppWindow implements OnInit {

  appService = inject(AppServices);

  windowX = signal(0);
  windowY = signal(0);

  offsetX = signal(0);
  offsetY = signal(0);

  isDragging = signal(false);

  contentName = input("");
  content = signal<any>('');

  appId = input(0);

  ngOnInit()
  {
    switch (this.contentName()) {
      case 'app-notepad':
        this.content.set(Notepad);
        break;
      case 'app-file-explorer':
        this.content.set(FileExplorer);
        break;
      default:
        break;
    }
  }

  closeWindow()
  {
    this.appService.closeApp(this.appId());
  }

  startDrag(event: MouseEvent)
  {

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
