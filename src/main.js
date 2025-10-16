let date = new Date();
document.querySelector("#clock").innerText = (date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes());
let timeUpdateID = setInterval(() => {
  document.querySelector("#clock").innerText = (date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes());
}, 1000 * 60);

///////////////////////////////////////////////////////////////

let windowsZindex = 1; //i hate this da e doar temporara. sper.

function dragElement(element) {
  let dragStartX = 0, dragStartY = 0;

  const elementParent = element.parentElement;

  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    dragStartX = e.clientX;
    dragStartY = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    elementParent.style.zIndex = windowsZindex;
    windowsZindex++;

    let offsetX = dragStartX - e.clientX;
    let offsetY = dragStartY - e.clientY;

    dragStartY = e.clientY;
    dragStartX = e.clientX;

    elementParent.style.top  = elementParent.offsetTop  - offsetY + "px";
    elementParent.style.left = elementParent.offsetLeft - offsetX + "px";

  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

///////////////////////////////////////////////////////////////

class App 
{
  constructor(appName = "newApp", appIconSrc = "../assets/img/defaultAppPic.png", runAppFunction = () => {})
  {
    this.appName = appName;
    this.runApp = runAppFunction;

    this.hasBeedAddedToDesktp = false;

    this.desktopApp = document.createElement("div");
    this.desktopApp.classList.add("desktopIcon");

    this.appIcon = document.createElement("img");
    this.appIcon.src = appIconSrc;

    this.appTitle = document.createElement("p");
    this.appTitle.innerText = this.appName;

    this.desktopApp.appendChild(this.appIcon);
    this.desktopApp.appendChild(this.appTitle);
  }

  setAppName(appName)
  {
    this.appName = appName;
    this.appTitle.innerText = this.appName;
  }

  setAppIcon(appIconSrc)
  {
    this.appIcon.src = appIconSrc;
  }

  setAppWindowFunction(runAppFunction)
  {
    this.runApp = runAppFunction;
  }

  addToDesktop() {

    if (this.hasBeedAddedToDesktp === true) return;

    const desktop = document.querySelector("#desktop");

    this.desktopApp.onclick = () => {
      this.open();
    }
    desktop.appendChild(this.desktopApp);

    this.hasBeedAddedToDesktp = true;

  }

  open() {

    //taskbar icon
    const taskbar = document.querySelector("#taskbarAppList");
    const taskbarIcon = document.createElement("img");
    taskbarIcon.src = this.appIcon.src;
    taskbar.appendChild(taskbarIcon);

    //main window
    const windows = document.querySelector("#windows");
    const newWindow = document.createElement("div");
    newWindow.classList.add("window");

    newWindow.style.zIndex = windowsZindex;
    windowsZindex++;

    const windowDragbar = document.createElement("div");
    windowDragbar.classList.add("windowDragbar");

    const windowCloseButton = document.createElement("button");
    windowCloseButton.classList.add("closeButton");
    windowCloseButton.innerText = 'X';

    windowCloseButton.onclick = () => {
      newWindow.remove()
      taskbarIcon.remove();
    };

    const windowContent = document.createElement("div");
    windowContent.classList.add("windowContent");

    windowDragbar.appendChild(windowCloseButton);
    newWindow.appendChild(windowDragbar);
    newWindow.appendChild(windowContent);

    windows.appendChild(newWindow);
    dragElement(windowDragbar);

  }
}

let sampleApp = new App();
sampleApp.addToDesktop();

let sampleApp2 = new App("Pen", "../assets/img/wallpaper.png");
sampleApp2.addToDesktop();

