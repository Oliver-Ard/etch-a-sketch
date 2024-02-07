const board = document.querySelector(".board");
const sizeInput = document.querySelector(".input-modal input");
const sizeBtn = document.querySelector(".input-modal button");
const modalMessage = document.querySelector(".input-modal p");
const boardBtns = document.querySelector(".board-buttons");

// App Logic
function createGrid(size) {
	deleteGrid();
	if (size <= 100 && size >= 2) {
		for (let i = 0; i < size; i++) {
			const gridRow = document.createElement("div");
			gridRow.classList.add("grid-row");

			for (let j = 0; j < size; j++) {
				const widthAndHeight = 800 / size;
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
		createGrid(16);
	}
}

function resetGrid() {
	if (board.childElementCount !== 16) {
		createGrid(16);
	}
}

function deleteGrid() {
	if (board.querySelector(".grid-row") !== null) {
		board.textContent = "";
		modalMessage.textContent = "";
	}
}

// Event Listeners
boardBtns.addEventListener("click", (e) => {
	if (e.target.id === "reset-btn") {
		resetGrid();
	}
});
sizeBtn.addEventListener("click", (e) => {
	e.preventDefault();
	createGrid(+sizeInput.value);
});
document.addEventListener("DOMContentLoaded", createGrid(16));
