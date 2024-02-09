// ----HTML Elements----
// Board
const board = document.querySelector(".board");
const boardBtns = document.querySelector(".board-buttons");
const topMessage = document.querySelector(".top-message");
const topParagraph = document.querySelector(".top-paragraph");
// Modal Box
const modalBox = document.querySelector(".modal-box");
const modalMessage = document.querySelector(".modal-box p");
const sizeInput = document.querySelector(".modal-box input");
const sizeBtn = document.querySelector(".modal-box button");

// ----Board Grid----
function createGrid(size) {
	sizeInput.value = "";
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
		topMessage.textContent = `Grid size: ${size} x ${size}`;
	}
}

function setGridSize(e) {
	e.preventDefault();
	if (sizeInput.value >= 2 && sizeInput.value <= 100) {
		toggleInputModal();
		createGrid(+sizeInput.value);
	} else {
		sizeInput.value = "";
		modalMessage.textContent = "Type a number between 2 and 100";
	}
}

// ----Board Buttons----
function chooseBoardBtns(e) {
	if (e.target.id === "random-color-btn") {
		setRandomColor();
	} else if (e.target.id === "black-color-btn") {
		setBlackColor();
	} else if (e.target.id === "erase-btn") {
		eraseColor();
	} else if (e.target.id === "clean-btn") {
		cleanBoard();
	} else if (e.target.id === "reset-btn") {
		initApp();
	} else if (e.target.id === "size-btn") {
		toggleInputModal();
	}
}

function setRandomColor() {
	topParagraph.textContent = "Random Color is Active";
	board.addEventListener("mouseover", (e) => {
		if (e.target.className.includes("grid-box")) {
			const rngRedColor = Math.floor(Math.random() * 255) + 1;
			const rngGreenColor = Math.floor(Math.random() * 255) + 1;
			const rngBlueColor = Math.floor(Math.random() * 255) + 1;
			e.target.style.backgroundColor = `rgb(${rngRedColor}, ${rngGreenColor}, ${rngBlueColor})`;
		}
	});
}

function setBlackColor() {
	topParagraph.textContent = "Black Color is Active";
	board.addEventListener("mouseover", (e) => {
		if (e.target.className.includes("grid-box")) {
			e.target.style.backgroundColor = "#000";
		}
	});
}

function eraseColor() {
	topParagraph.textContent = "Eraser is Active";
	board.addEventListener("mouseover", (e) => {
		if (e.target.className.includes("grid-box")) {
			e.target.style.backgroundColor = "#fff";
		}
	});
}

function cleanBoard() {
	const gridBoxes = document.querySelectorAll(".board .grid-box");
	for (let box of gridBoxes) {
		box.style.backgroundColor = "#fff";
	}
}

// ----Helper Functions----
function deleteGrid() {
	if (board.querySelector(".grid-row") !== null) {
		board.textContent = "";
		modalMessage.textContent = "";
	}
}

function toggleInputModal() {
	modalBox.classList.toggle("active");
}

// This function will initialize the app
function initApp() {
	createGrid(16);
	setBlackColor();
}

// ----Event Listeners----
boardBtns.addEventListener("click", chooseBoardBtns);
sizeBtn.addEventListener("click", setGridSize);
document.addEventListener("DOMContentLoaded", initApp);
