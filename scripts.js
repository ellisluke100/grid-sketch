// Element references
const gridElement = document.querySelector("#grid");
const colorPicker = document.querySelector(".color-picker")
const clearGridBtn = document.querySelector(".clear-btn")
const eraserBtn = document.querySelector(".eraser-btn");
const bodyElement = document.querySelector("body");
const sliderLabel = document.querySelector(".slider-label");
const sliderElement  = document.querySelector(".size-slider");

const gridStyles = getComputedStyle(gridElement);
const gridHeight = parseInt((gridStyles.height).slice(0, gridStyles.height.length-2));
const gridWidth = parseInt((gridStyles.width).slice(0, gridStyles.width.length-2)); 

let currentBrushColor = "#000000";
let previousBrushColor = currentBrushColor;
let erasing = false;

function clearExistingGrid() {
    while (gridElement.firstChild) {
        gridElement.removeChild(gridElement.lastChild);
    }
}

function createGrid(size) {
    // Create a row
    // Add a column of grid squares
    // Add a listener to each

    if (gridElement.hasChildNodes()) {clearExistingGrid();}

    // Calculate size of each cell
    const cellSize = gridHeight/size;

    // Rows
    for (let i = 0; i < size; i++) {
        let newRow = document.createElement("div");
        newRow.className = "grid-row";

        // Column
        for (let j = 0; j < size; j++) {

            // Create a new square
            let newSquare = document.createElement("div");
            newSquare.className = "grid-square";

            // Set height and width according to our grid size
            newSquare.style.height = "" + cellSize + "px";
            newSquare.style.width = "" + cellSize + "px";

            /*
            // Add event listeners for the hover event
            newSquare.addEventListener('mouseover', (e) => {
                console.log("Mouse over");
                e.target.style.backgroundColor = "#AB33AA";
            });*/

            // Finally, add the newly created square to the row element
            newRow.appendChild(newSquare);
        }

        // Add row element to the grid
        gridElement.appendChild(newRow);
    }   
}

let leftClickDown = false;

clearGridBtn.addEventListener('click', () => {
    const gridSquares = document.querySelectorAll(".grid-square");
    gridSquares.forEach((square) => {
        square.style.backgroundColor = "#FFFFFF";
    });
});

eraserBtn.addEventListener('click', () => {
    if (!erasing) {
        previousBrushColor = currentBrushColor;
        currentBrushColor = "#FFFFFF";
        erasing = true;
        eraserBtn.classList.add("active-btn");
    } else {
        erasing = false;
        currentBrushColor = previousBrushColor;
        eraserBtn.classList.remove("active-btn");
    }
});

gridElement.addEventListener('mouseover', (e) => {
    if (leftClickDown) {
        e.target.style.backgroundColor = currentBrushColor;
    }
});

gridElement.addEventListener('mousedown', (e) => {
    e.target.style.backgroundColor = currentBrushColor;
});

// https://stackoverflow.com/questions/322378/javascript-check-if-mouse-button-down
function setClickState(e) {
    var flags = e.buttons !== undefined ? e.buttons : e.which;
    leftClickDown = (flags & 1) === 1;
}

document.addEventListener("mousedown", setClickState);
document.addEventListener("mousemove", setClickState);
document.addEventListener("mouseup", setClickState);

colorPicker.addEventListener('change', (e) => {
    currentBrushColor = e.target.value;
});

sliderElement.oninput = () => {
    sliderLabel.textContent = "" + sliderElement.value + " x " + sliderElement.value;
}

sliderElement.onchange = () => {
    createGrid(sliderElement.value);
}

createGrid(25);