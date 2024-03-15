//GameBoardUI.js

"use strict";

import CssClasses from "../models/CssClasses";
import PlayerType from "../models/PlayerType";

class GameBoardUi {
	static createBoardUI(board) {
		const table = document.getElementById("boardTable");
		table.innerHTML = "";
		const tableBody = document.createElement("tbody");
		for (let x = 0; x < board.length; x++) {
			const row = document.createElement("tr");
			for (let y = 0; y < board.length; y++) {
				const cell = document.createElement("td");
				cell.id = `x${x}y${y}`;
				const item = board[x][y];
				switch (item) {
					case "G":
						cell.classList.add(...CssClasses[item]);
						break;
					case "W":
						cell.classList.add(...CssClasses[item]);
						break;
					case "T":
						cell.classList.add(...CssClasses[item]);
						break;
				}

				row.append(cell);
			}
			tableBody.append(row);
		}
		const tableElement = document.createElement("table");
		tableElement.id = "boardTable";
		table.append(tableBody);
	}

	static initPlayerPosition(playerType, { x, y }) {
		// zou ook in updatePlayerPosition kunnen, maar bij iedere update moet dan gecheckt worden of het element al bestaat
		const player = document.createElement("div");
		player.id = playerType;
		player.classList.add(...CssClasses[playerType]);
		document.getElementById(`x${x}y${y}`).append(player);
	}

	static updatePlayerPosition(playerType, { x, y }) {
		document.getElementById(`x${x}y${y}`).append(document.getElementById(playerType));
	}

	static removeTreasure({ x, y }) {
		document.getElementById(`x${x}y${y}`).className = [...CssClasses.G].join(" ");
	}
}

export default GameBoardUi;
