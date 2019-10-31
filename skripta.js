var x = document.getElementsByClassName("infoButton");
var max = screen.height / 16
var max2 = screen.width / 12
var i;
for (i = 0; i < x.length; i++) {
  x[i].style.top = Math.floor((Math.random() * (max - 10)) + 10)+'px';
  x[i].style.left = Math.floor((Math.random() * (max2 - 10)) + 10)+'px';
  // x[i].style.background = "hsl("+Math.floor((Math.random() * (250 - 210)) + 210)+", 100%, 75%)";
}



var container = document.querySelector(".dragContainer");
var activeItem = null;

var active = false;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {

  if (e.target !== e.currentTarget && $(e.target).hasClass("infoButton") ) {
    active = true;

    // this is the item we are interacting with
    activeItem = e.target;

    if (activeItem !== null) {
      if (!activeItem.xOffset) {
        activeItem.xOffset = 0;
      }

      if (!activeItem.yOffset) {
        activeItem.yOffset = 0;
      }

      if (e.type === "touchstart") {
        activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
        activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
      } else {
        console.log("doing something!");
        activeItem.initialX = e.clientX - activeItem.xOffset;
        activeItem.initialY = e.clientY - activeItem.yOffset;
      }
    }
  }
}

function dragEnd(e) {
  if (activeItem !== null) {
    activeItem.initialX = activeItem.currentX;
    activeItem.initialY = activeItem.currentY;
  }

  active = false;
  activeItem = null;
}

function drag(e) {
  if (active) {
    if (e.type === "touchmove") {
      e.preventDefault();

      activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
      activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
    } else {
      activeItem.currentX = e.clientX - activeItem.initialX;
      activeItem.currentY = e.clientY - activeItem.initialY;
    }

    activeItem.xOffset = activeItem.currentX;
    activeItem.yOffset = activeItem.currentY;

    setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

addEventListener("touchmove", function (event) {
if (event.target.setAttribute) {
    event.target.setAttribute("data-active", "");
}
}, true);

addEventListener("touchend", function (event) {
    if (event.target.removeAttribute) {
        event.target.removeAttribute("data-active");
    }
}, true);
