import { Component, HostListener , signal, input, inject, ViewContainerRef, OnInit, computed } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import type AppData from '../../../types/AppData'
import { AppServices } from '../app-services'
import { AspectService } from '../aspect-service'
import { Notepad } from '../notepad/notepad'
import { FileExplorer } from '../file-explorer/file-explorer'
import { Calculator } from '../calculator/calculator';

@Component({
  selector: 'app-window',
  imports: [CommonModule, NgStyle],
  templateUrl: './app-window.html',
  styleUrl: './app-window.scss'
})
export class AppWindow implements OnInit{

  appService = inject(AppServices);
  aspectService = inject(AspectService);

  windowX = signal(200);
  windowY = signal(200);

  windowW = signal(600);
  windowH = signal(400);

  cursor = signal('default');

  constructor(){
    if(this.appService.isMobile){
      this.windowX.set(0);
      this.windowY.set(0);

      this.windowW.set(window.innerWidth);
      this.windowH.set(window.innerHeight - 100);
    }
  }

  windowSize = computed(() => {
    return {
      'left.px': this.windowX(),
      'top.px':  this.windowY(),
      'width.px': this.windowW(),
      'height.px': this.windowH(),
      'cursor': this.cursor()
    };
  })

  ngOnInit()
  {
    let windowPos: {winX: number, winY: number} = this.aspectService.getNextWindowPos();
    this.windowX.set(windowPos.winX);
    this.windowY.set(windowPos.winY);
  }

  offsetX = signal(0);
  offsetY = signal(0);

  isDragging = signal(false);

  isResizingRight = signal(false);
  isResizingLeft= signal(false);
  isResizingBottom = signal(false);

  app = input<AppData>({
    appIcon: '',
    appName: '',
    appId: 0,
    appContent: null
  });

  hideWindow()
  {
    this.appService.toggleAppVisibility(this.app().appId);
  }

  closeWindow()
  {
    this.appService.closeApp(this.app().appId);
    this.aspectService.subNextWindowPos();
  }

  maximizeWindow()
  {
    if(this.appService.isMobile) return;

    if (this.windowX() == 0)
    {
      this.windowX.set(200);
      this.windowY.set(200);
      this.windowW.set(600);
      this.windowH.set(400);
    }
    else
    {
      this.windowX.set(0);
      this.windowY.set(window.innerHeight / 100 * 6);
      this.windowW.set(window.innerWidth);
      this.windowH.set(window.innerHeight / 100 * 94);
    }

    this.appService.focusApp(this.app().appId);
  }

  startDrag(event: MouseEvent)
  {
    if(this.appService.isMobile) return;

    event.preventDefault();

    if (this.windowW() == window.innerWidth && this.windowX() == 0)
    {
      this.windowW.set(600);
      this.windowH.set(400);
      this.offsetX.set(-300);
    }
    else
    {
      this.offsetX.set(this.windowX() - event.clientX);
      this.offsetY.set(this.windowY() - event.clientY);
    }

    this.appService.focusApp(this.app().appId);
    this.isDragging.set(true);
  }

  @HostListener("window:mousedown", ["$event"])
  onMouseDown(event: MouseEvent)
  {
    if(this.appService.isMobile) return;

    if (this.cursorOnRightBorder(event)){
      this.isResizingRight.set(true);
      this.appService.focusApp(this.app().appId);
    }
    if (this.cursorOnLeftBorder(event)){
      this.isResizingLeft.set(true);
      this.appService.focusApp(this.app().appId);
    }
    if (this.cursorOnBottomBorder(event)){
      this.isResizingBottom.set(true);
      this.appService.focusApp(this.app().appId);
    }
  }

  @HostListener("window:mousemove", ["$event"])
  onMouseMove(event: MouseEvent)
  {
    if(this.appService.isMobile) return;

    if (this.cursorOnLeftBorder(event) || this.cursorOnRightBorder(event))
      this.cursor.set('ew-resize');
    if (this.cursorOnBottomBorder(event))
    {
      this.cursor.set('ns-resize');
      if (this.cursorOnRightBorder(event))
        this.cursor.set('nwse-resize')
      if (this.cursorOnLeftBorder(event))
        this.cursor.set('nesw-resize')
    }

    if (this.isResizingRight())
      this.windowW.update((val) => val + (event.clientX - (this.windowX() + val)));
    if (this.isResizingLeft())
    {
      this.windowW.update((val) => val + (this.windowX() - event.clientX));
      this.windowX.update((val) => val - (this.windowX() - event.clientX))
    }
    if (this.isResizingBottom())
      this.windowH.update((val) => val + (event.clientY - (this.windowY() + val)));

    ///////////////////////////////

    if (this.isDragging() === false)
      return;

    this.windowX.set(event.clientX + this.offsetX())
    this.windowY.set(event.clientY + this.offsetY())

  }

  @HostListener("window:mouseup", ["$event"])
  onMouseUp(event: MouseEvent)
  {
    this.isDragging.set(false);

    this.isResizingRight.set(false);
    this.isResizingLeft.set(false);
    this.isResizingBottom.set(false);

    this.cursor.set("default");
  }

  lastWindowX: number = 0;
  lastWindowY: number = 0;
  lastWindowW: number = 0;
  lastWindowH: number = 0;
  switchedToMobile: boolean = false;

  @HostListener("window:resize")
  onViewportResize(){
    if(this.appService.isMobile){
      if(!this.switchedToMobile){
        this.lastWindowX = this.windowX();
        this.lastWindowY = this.windowY();
        this.lastWindowW = this.windowW();
        this.lastWindowH = this.windowH();
        this.switchedToMobile = true;
      }

      this.windowX.set(0);
      this.windowY.set(0);
      this.windowW.set(window.innerWidth);
      this.windowH.set(window.innerHeight - 85);
    }
    else{
      if(this.switchedToMobile){
        this.windowX.set(this.lastWindowX);
        this.windowY.set(this.lastWindowY);
        this.windowW.set(this.lastWindowW);
        this.windowH.set(this.lastWindowH);
      }
      this.switchedToMobile = false;
    }
  }

  cursorOnLeftBorder(event: MouseEvent)
  {
    if (event.clientY < this.windowY() || event.clientY > this.windowY() + this.windowH()) return false;
    if (event.clientX < this.windowX() || event.clientX > this.windowX() + 7) return false;
    return true;
  }

  cursorOnRightBorder(event: MouseEvent)
  {
    if (event.clientY < this.windowY() || event.clientY > this.windowY() + this.windowH()) return false;
    if (event.clientX > this.windowX() + this.windowW() || event.clientX < this.windowX() + this.windowW() - 7) return false;
    return true;
  }

  cursorOnBottomBorder(event: MouseEvent)
  {
    if (event.clientX < this.windowX() || event.clientX > this.windowX() + this.windowW()) return false;
    if (event.clientY > this.windowY() + this.windowH() || event.clientY < this.windowY() + this.windowH() - 7)
      return false;

    return true;
  }
}
