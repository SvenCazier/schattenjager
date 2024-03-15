// GameState.js

"use strict";

import PlayerType from "../models/PlayerType";

class GameState {
	#board = [];
	#initialHumanPosition = {};
	#initialComputerPosition = {};
	#remainingLives = 0;
	#remainingTreassures = 0;

	constructor(dimensions, walls, treasures, lives) {
		this.#remainingTreassures = treasures;
		this.#remainingLives = lives;
		this.createBoard(dimensions, walls, treasures);
	}

	get board() {
		return this.#board;
	}

	get initialHumanPosition() {
		return this.#initialHumanPosition;
	}

	get initialComputerPosition() {
		return this.#initialComputerPosition;
	}

	createBoard(dimensions, walls, treasures) {
		// vul bord met gras
		for (let x = 0; x < dimensions; x++) {
			this.#board[x] = [];
			for (let y = 0; y < dimensions; y++) {
				this.#board[x][y] = "G";
			}
		}

		// plaats random x-aantal muren
		for (let i = 0; i < walls; i++) {
			this.#placeItemOnBoard("W");
		}

		// plaats random x-aantal schatten
		for (let i = 0; i < treasures; i++) {
			this.#placeItemOnBoard("T");
		}

		this.#initialComputerPosition = this.#placeItemOnBoard("C");
		this.#initialHumanPosition = this.#placeItemOnBoard("H");
	}

	#placeItemOnBoard(item) {
		let x, y;
		do {
			x = Math.floor(Math.random() * this.#board.length);
			y = Math.floor(Math.random() * this.#board.length);
		} while (this.#board[x][y] !== "G" || this.#isLockedIn(item, x, y));
		// de spelers zijn op zich geen onderdeel van de layout van het bord, zou ook van schat gezegd kunnen worden, maar dan zou er een aparte lijst met schatposities moeten bestaan
		if (item !== "C" && item !== "H") {
			this.#board[x][y] = item;
		}
		return { x, y };
	}

	// voorkom dat schatten of spelers tussen 4 muren geplaatst worden
	#isLockedIn(item, x, y) {
		if (item !== "W") {
			// als één van de aangrenzende vakjes geen muur bevat is het niet "locked in"
			if (x > 0 && this.#board[x - 1][y] !== "W") {
				return false;
			}
			if (x < this.#board.length - 1 && this.#board[x + 1][y] !== "W") {
				return false;
			}
			if (y > 0 && this.#board[x][y - 1] !== "W") {
				return false;
			}
			if (y < this.#board.length - 1 && this.#board[x][y + 1] !== "W") {
				return false;
			}
			return true;
		}
		return false;
	}

	canMove({ x, y }) {
		if (x >= 0 && x < this.#board.length && y >= 0 && y < this.#board.length) {
			if (this.#board[x][y] !== "W") {
				return true;
			}
		}
	}

	isTreasure({ x, y }) {
		if (this.#board[x][y] === "T") {
			return true;
		}
		return false;
	}

	removeTreasure({ x, y }) {
		this.#remainingTreassures = Math.max(0, --this.#remainingTreassures);
		this.#board[x][y] = "G";
	}

	playerWins() {
		return !this.#remainingTreassures;
	}

	removeLife() {
		this.#remainingLives = Math.max(0, --this.#remainingLives);
	}

	computerWins() {
		return !this.#remainingLives;
	}
}

export default GameState;
