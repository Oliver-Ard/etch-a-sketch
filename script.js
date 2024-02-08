const board = document.querySelector(".board");
const sizeInput = document.querySelector(".input-modal input");
const sizeBtn = document.querySelector(".input-modal button");
const modalMessage = document.querySelector(".input-modal p");
const boardBtns = document.querySelector(".board-buttons");

function createGrid(size) {
	if (size >= 2 && size <= 100) {
		deleteGrid();
		// Create the rows
		for (let i = 0; i < size; i++) {
			const gridRow = document.createElement("div");
			gridRow.classList.add("grid-row");
			// Create the boxes for each row
			for (let j = 0; j < size; j++) {
				const widthAndHeight = board.offsetWidth / size;
				const gridBox = document.createElement("div");
				gridBox.classList.add("grid-box");
				gridBox.style.width = `${widthAndHeight}px`;
				gridBox.style.height = `${widthAndHeight}px`;
				gridRow.appendChild(gridBox);
			}
			board.appendChild(gridRow);
		}
	} else {
		modalMessage.textContent = "Type a number between 2 and 100";
	}
}

// ----Functions For The Board Buttons----
function setColorBlack() {
	board.addEventListener("mouseover", (e) => {
		if (e.target.className.includes("grid-box")) {
			e.target.style.backgroundColor = "#000";
		}
	});
}

function eraseColor() {
	board.addEventListener("mouseover", (e) => {
		if (e.target.className.includes("grid-box")) {
			e.target.style.backgroundColor = "#fff";
		}
	});
}

function cleanTheBoard() {
	const boardRows = board.children;
	for (let row of boardRows) {
		for (let box of row.children) {
			box.style.backgroundColor = "#fff";
		}
	}
	setColorBlack();
}

function resetGrid() {
	if (board.childElementCount) {
		createGrid(16);
	}
}

// ----Helper Functions----
function deleteGrid() {
	if (board.querySelector(".grid-row") !== null) {
		board.textContent = "";
		// Delete the modal message if the number of boxes is between 2 and 100
		modalMessage.textContent = "";
	}
}

// This function will initialize the app
function init() {
	createGrid(16);
	setColorBlack();
}

// ----Event Listeners----
boardBtns.addEventListener("click", (e) => {
	if (e.target.id === "reset-btn") {
		resetGrid();
	} else if (e.target.id === "black-color") {
		setColorBlack();
	} else if (e.target.id === "clean-btn") {
		cleanTheBoard();
	} else if (e.target.id === "erase-btn") {
		eraseColor();
	}
});
sizeBtn.addEventListener("click", (e) => {
	e.preventDefault();
	createGrid(+sizeInput.value);
});

document.addEventListener("DOMContentLoaded", init);
