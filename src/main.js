let date = new Date();
document.querySelector("#clock").innerText = (date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes());
let timeUpdateID = setInterval(() => {
  document.querySelector("#clock").innerText = (date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes());
}, 1000 * 60);

///////////////////////////////////////////////////////////////

let windowsZindex = 1; //i hate this da e doar temporara. sper.
let onEdge = false;

function dragElement(element) {
  let dragStartX = 0, dragStartY = 0;

  const elementParent = element.parentElement;

  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
		if(onEdge) return;

    e = e || window.event;
    e.preventDefault();

    dragStartX = e.clientX;
    dragStartY = e.clientY;

		windowsZindex++;
		elementParent.style.zIndex = windowsZindex;
		
		elementParent.style.cursor = "move";
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
		elementParent.style.cursor = "move";	// Dirty hack

    let offsetX = dragStartX - e.clientX;
    let offsetY = dragStartY - e.clientY;

    dragStartY = e.clientY;
    dragStartX = e.clientX;

    elementParent.style.top  = elementParent.offsetTop  - offsetY + "px";
    elementParent.style.left = elementParent.offsetLeft - offsetX + "px";

  }

  function closeDragElement() {
		elementParent.style.cursor = "default";
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

///////////////////////////////////////////////////////////////

// Make given window resizable
function resizableWindow(element){
  let mouseX, mouseY;
  let cursor = "";
  let startWidth, startHeight, startLeft, startTop;
  onEdge = false;

  element.onmousemove = windowResizeEdge;
  element.onmousedown = windowResizeMouseDown;

  // Activate window resizing when mouse is held down
  function windowResizeMouseDown(e){
      if(!onEdge) return;
        
  	  const rect = element.getBoundingClientRect();
      const parentRect = element.offsetParent?.getBoundingClientRect() || { top: 0, left: 0 };

      mouseX = e.clientX;
      mouseY = e.clientY;

      startWidth = rect.width;
			startHeight = rect.height;

      startTop = rect.top - parentRect.top;
      startLeft = rect.left - parentRect.left;

			windowsZindex++;
			element.style.zIndex = windowsZindex;

      document.onmousemove = windowResize;
      document.onmouseup = windowStopResize;
      document.documentElement.classList.add("unselectable");
      element.onmousemove = null;
  }

  // Resize window along edge orientation
  function windowResize(e){
    const cusrorSubstr = cursor.substring(0, 2);

    const dx = e.clientX - mouseX;
    const dy = e.clientY - mouseY;

    if(cusrorSubstr.includes("e")){
      element.style.width = startWidth + dx + "px";
    }
      if(cusrorSubstr.includes("w")){
        element.style.width = startWidth - dx + "px";
        element.style.left = startLeft + dx + "px";
      }
      if(cusrorSubstr.includes("s")){
        element.style.height = startHeight + dy + "px";
      }
      if(cusrorSubstr.includes("n")){
        element.style.height = startHeight - dy + "px";
        element.style.top = startTop + dy + "px";
      }
  	}

  // Determine cursor type relative to edge orientation
  function windowResizeEdge(e) {
    const rect = element.getBoundingClientRect();
    let edgeSize = 10;
    let edge = "";

    // Check horizontal edges
    if(e.clientX >= rect.left - edgeSize && e.clientX <= rect.left + edgeSize){
      edge = "w";
    }
    else if(e.clientX >= rect.right - edgeSize && e.clientX <= rect.right + edgeSize){
      edge = "e";
    }

    // Check vertical edges
    if(e.clientY >= rect.top - edgeSize && e.clientY <= rect.top + edgeSize){
      edge = edge ? "n" + edge : "n";
    }
    else if(e.clientY >= rect.bottom - edgeSize && e.clientY <= rect.bottom + edgeSize){
      edge = edge ? "s" + edge : "s";
    }
    cursor = edge + "-resize";

    if(edge){
      element.style.cursor = cursor;
      onEdge = true;
    }
    else{
      element.style.cursor = "default";
      onEdge = false;
    }
  }

  // Stop window resizing
  function windowStopResize(){
    document.onmousemove = null;
    document.onmouseup = null;
    document.documentElement.classList.remove("unselectable");
    element.onmousemove = windowResizeEdge;
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

		const windowName = document.createElement("div");
		windowName.innerHTML = this.appName;

    const windowCloseButton = document.createElement("button");
    windowCloseButton.classList.add("closeButton");
    windowCloseButton.innerText = 'X';

    windowCloseButton.onclick = () => {
      newWindow.remove()
      taskbarIcon.remove();
    };

    const windowContent = document.createElement("div");
    windowContent.classList.add("windowContent");

		windowDragbar.appendChild(windowName);
    windowDragbar.appendChild(windowCloseButton);
    newWindow.appendChild(windowDragbar);
    newWindow.appendChild(windowContent);

    windows.appendChild(newWindow);
    dragElement(windowDragbar);
    resizableWindow(newWindow);
  }
}

let sampleApp = new App();
sampleApp.addToDesktop();

let sampleApp2 = new App("Pen", "../assets/img/wallpaper.png");
sampleApp2.addToDesktop();

