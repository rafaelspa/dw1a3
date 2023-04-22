var dragSrcEl = null;

function handleDragStart(e) {
  // Set the source element for the drag event
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function handleDragOver(e) {
  // Allow dropping on this element
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = "move";
  return false;
}

function handleDrop(e) {
  // Move the source element to the drop target
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
}

function handleDragEnd() {
  // Clean up after the drag event
  var rows = document.querySelectorAll(".draggable");
  [].forEach.call(rows, function (row) {
    row.classList.remove("dragging");
  });
}

function addListeners() {
  var rows = document.querySelectorAll(".draggable");
  [].forEach.call(rows, function (row) {
    row.addEventListener("dragstart", handleDragStart, false);
    row.addEventListener("dragover", handleDragOver, false);
    row.addEventListener("drop", handleDrop, false);
    row.addEventListener("dragend", handleDragEnd, false);
  });
}
