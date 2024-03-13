//GameBoardUI.js

"use strict";

class GameBoardUi {
	static createBoardUI(board) {
		const tableBody = document.createElement("tbody");
		for (let x = 0; x < board.length; x++) {
			const row = document.createElement("tr");
			for (let y = 0; y < board.length; y++) {
				const cell = document.createElement("td");
				cell.id = `x${x}y${y}`;
				const item = board[x][y];
				switch (item) {
					case "G":
					case "C":
					case "H":
						if (item === "C") {
							const computer = document.createElement("div");
							computer.id = "computer";
							computer.classList.add("player", "computer");
							cell.append(computer);
						} else if (item === "H") {
							const human = document.createElement("div");
							human.id = "human";
							human.classList.add("player", "human");
							cell.append(human);
						}
						cell.classList.add("grass");
						break;
					case "W":
						cell.classList.add("wall");
						break;
					case "T":
						cell.classList.add("treasure");
						break;
				}

				row.append(cell);
			}
			tableBody.append(row);
		}
		const table = document.getElementById("boardTable");
		table.append(tableBody);
	}

	static drawPosition(player, position) {
		const square = document.getElementById(`x${position.x}y${position.y}`);
		square.append(document.getElementById(player));
	}

	static isWallCollision({ x, y }) {
		return document.getElementById(`x${x}y${y}`).classList.contains("wall");
	}

	static isTreasureCollision({ x, y }) {
		const element = document.getElementById(`x${x}y${y}`);
		if (element.classList.contains("treasure")) {
			element.className = "grass";
			return true;
		}
		return false;
	}
}

export default GameBoardUi;
