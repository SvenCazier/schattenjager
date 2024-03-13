//Schattenjager.js

"use strict";

import GameBoardUi from "../ui/gameboardUI";
import OutputService from "../services/OutputService";
import HumanPlayer from "../models/HumanPlayer";
import ComputerPlayer from "../models/ComputerPlayer";

class Schattenjager {
	#dimensions = 0;
	#walls = 0;
	#treasures = 0;
	#board = [];
	#humanPlayer;
	#computerPlayer;
	#directions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
	#computerMovementInterval;

	constructor(lives, dimensions, walls, treasures, speed) {
		this.#dimensions = dimensions;
		this.#walls = walls;
		this.#treasures = treasures;
		if (this.#dimensions ** 2 - (this.#walls + this.#treasures + 2) > 0) {
			this.#humanPlayer = new HumanPlayer(lives);
			this.#computerPlayer = new ComputerPlayer(speed);
			this.#board = this.createBoardArray(this.#dimensions, this.#walls, this.#treasures);
			GameBoardUi.createBoardUI(this.#board);
			OutputService.printStartMsg();
			document.addEventListener("keydown", this.#handleUserInput);
			this.#computerMovementInterval = setInterval(this.#handleComputerMovement.bind(this), this.#computerPlayer.speed * 200);
		} else {
			// error
		}
	}

	createBoardArray(dimensions, walls, treasures) {
		let board = [];

		// vul bord met gras
		for (let x = 0; x < dimensions; x++) {
			board[x] = [];
			for (let y = 0; y < dimensions; y++) {
				board[x][y] = "G";
			}
		}

		// plaats random x-aantal muren
		for (let i = 0; i < walls; i++) {
			this.placeItemOnBoard(board, "W");
		}

		// plaats random x-aantal schatten
		for (let i = 0; i < treasures; i++) {
			this.placeItemOnBoard(board, "T");
		}

		this.#humanPlayer.setPosition(this.placeItemOnBoard(board, "H"));
		this.#computerPlayer.setPosition(this.placeItemOnBoard(board, "C"));

		return board;
	}

	placeItemOnBoard(board, item) {
		let x, y;
		do {
			x = Math.floor(Math.random() * board.length);
			y = Math.floor(Math.random() * board.length);
		} while (board[x][y] !== "G");
		board[x][y] = item;
		return { x, y };
	}

	#handleUserInput = (event) => {
		this.#humanPlayer.position;
		const key = event.key;

		if (this.#directions.includes(key)) {
			event.preventDefault();
			// check for colisions and stuff before setting
			const nextPosition = this.#nextPosition(this.#humanPlayer, key);
			if (!GameBoardUi.isWallCollision(nextPosition)) {
				if (GameBoardUi.isTreasureCollision(nextPosition)) {
					this.#humanPlayer.collectTreasure();
					OutputService.printTreasureMsg();
					// Update UI with collected treasures
				}
				this.#humanPlayer.setPosition(nextPosition);
				GameBoardUi.drawPosition("human", this.#humanPlayer.position);
			}
		}
	};

	#handleComputerMovement() {
		const directionsCopy = [...this.#directions];
		let nextPosition = {};
		let isWallCollision = true; // ORIGINELE WAARDE = FALSE

		// BEGIN NIEUWE CODE
		const distanceX = this.#computerPlayer.position.x - this.#humanPlayer.position.x;
		const absDistanceX = Math.abs(distanceX);
		const distanceY = this.#computerPlayer.position.y - this.#humanPlayer.position.y;
		const absDistanceY = Math.abs(distanceY);
		if (absDistanceX <= 10 && absDistanceY <= 10) {
			if (absDistanceX < absDistanceY) {
				if (distanceX > 0) {
					// NAAR BOVEN
					nextPosition = this.#nextPosition(this.#computerPlayer, directionsCopy[0]);
				} else if (distanceX === 0) {
					// OP ZELFDE RIJ, CHECK Y VOOR LINKS OF RECHTS, Y KAN HIER NIET 0 ZIJN
					if (distanceY > 0) {
						// NAAR LINKS
						nextPosition = this.#nextPosition(this.#computerPlayer, directionsCopy[2]);
					} else {
						// NAAR RECHTS
						nextPosition = this.#nextPosition(this.#computerPlayer, directionsCopy[3]);
					}
				} else {
					// NAAR ONDER
					nextPosition = this.#nextPosition(this.#computerPlayer, directionsCopy[1]);
				}
			} else {
				if (distanceY > 0) {
					// NAAR LINKS
					nextPosition = this.#nextPosition(this.#computerPlayer, directionsCopy[2]);
				} else if (distanceY === 0) {
					// ZELFDE KOLOM, CHECK X VOOR BOVEN OF ONDER, ALS X === 0 DAN ZELFDE VAK
					if (distanceX > 0) {
						// NAAR BOVEN
						nextPosition = this.#nextPosition(this.#computerPlayer, directionsCopy[0]);
					} else if (distanceX === 0) {
						// ZELFDE VAK
					} else {
						// NAAR ONDER
						nextPosition = this.#nextPosition(this.#computerPlayer, directionsCopy[1]);
					}
				} else {
					// NAAR RECHTS
					nextPosition = this.#nextPosition(this.#computerPlayer, directionsCopy[3]);
				}
				isWallCollision = GameBoardUi.isWallCollision(nextPosition);
			}
		} // EINDE NIEUWE CODE

		// NIEUWE LOOP
		while (directionsCopy.length && isWallCollision) {
			const key = directionsCopy.splice(Math.floor(Math.random() * directionsCopy.length), 1)[0];
			nextPosition = this.#nextPosition(this.#computerPlayer, key);
			isWallCollision = GameBoardUi.isWallCollision(nextPosition);
		}

		// ORIGINELE LOOP
		// do {
		// 	const key = directionsCopy.splice(Math.floor(Math.random() * directionsCopy.length), 1)[0];
		// 	nextPosition = this.#nextPosition(this.#computerPlayer, key);
		// 	isWallCollision = GameBoardUi.isWallCollision(nextPosition);
		// } while (directionsCopy.length && isWallCollision);

		if (!isWallCollision) {
			this.#computerPlayer.setPosition(nextPosition);
			GameBoardUi.drawPosition("computer", this.#computerPlayer.position);
		} else {
			// edge case waar vijand tussen 4 muren zit opgesloten
			clearInterval(this.#computerMovementInterval);
		}
	}

	#nextPosition(player, key) {
		const { x, y } = player.position;
		switch (key) {
			case "ArrowUp":
				return { x: Math.max(0, x - 1), y: y };
			case "ArrowDown":
				return { x: Math.min(x + 1, this.#dimensions - 1), y: y };
			case "ArrowLeft":
				return { x: x, y: Math.max(0, y - 1) };
			case "ArrowRight":
				return { x: x, y: Math.min(y + 1, this.#dimensions - 1) };
		}
	}
}

export default Schattenjager;
