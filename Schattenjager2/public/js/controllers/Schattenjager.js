//Schattenjager.js

"use strict";

import GameState from "../services/GameState";
import GameUI from "../ui/GameUI";
import GameBoardUi from "../ui/GameBoardUI";
import OutputService from "../services/OutputService";
import PlayerType from "../models/PlayerType";
import HumanPlayer from "../models/HumanPlayer";
import ComputerPlayer from "../models/ComputerPlayer";

class Schattenjager {
	#dimensions;
	#walls;
	#treasures;
	#lives;
	#speed;
	#gameState;
	#humanPlayer;
	#computerPlayer;
	#directions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
	#computerMovementInterval;

	/**
	 * Updates user credentials.
	 * @param {integer} dimensions
	 * @param {integer} walls
	 * @param {integer} treasures
	 * @param {integer} lives
	 * @param {integer} speed
	 */
	constructor(dimensions, walls, treasures, lives, speed) {
		this.#dimensions = dimensions;
		this.#walls = walls;
		this.#treasures = treasures;
		this.#lives = lives;
		this.#speed = speed;
		GameUI.create();
		this.#init(dimensions, walls, treasures, lives, speed);
	}

	reset() {
		OutputService.clearMessages();
		this.#init(this.#dimensions, this.#walls, this.#treasures, this.#lives, this.#speed);
	}

	#init(dimensions, walls, treasures, lives, speed) {
		if (dimensions ** 2 - (walls + treasures + 2) > 0) {
			this.#gameState = new GameState(dimensions, walls, treasures, lives);
			this.#humanPlayer = new HumanPlayer(lives, this.#gameState.initialHumanPosition);
			this.#computerPlayer = new ComputerPlayer(speed, this.#gameState.initialComputerPosition);
			GameBoardUi.createBoardUI(this.#gameState.board);
			GameBoardUi.initPlayerPosition(PlayerType.HUMAN, this.#humanPlayer.position);
			GameBoardUi.initPlayerPosition(PlayerType.COMPUTER, this.#computerPlayer.position);
			OutputService.updateLivesCount(lives);
			OutputService.updateTreasureCount(0);
			OutputService.printStartMsg();
			document.addEventListener("keydown", this.#handleUserInput);
			this.#computerMovementInterval = setInterval(this.#handleComputerMovement.bind(this), this.#computerPlayer.speed);
		} else {
			alert("Kon geen speelbaar bord maken.");
		}
	}

	#handleUserInput = (event) => {
		const key = event.key;
		if (this.#directions.includes(key)) {
			event.preventDefault();
			const nextPosition = this.#humanPlayer.nextPosition(key);
			if (this.#gameState.canMove(nextPosition)) {
				if (this.#gameState.isTreasure(nextPosition)) {
					this.#humanPlayer.collectTreasure();
					this.#gameState.removeTreasure(nextPosition);
					GameBoardUi.removeTreasure(nextPosition);
					OutputService.printTreasureMsg();
					OutputService.updateTreasureCount(this.#humanPlayer.collectedTreasures);
					if (this.#gameState.playerWins()) {
						OutputService.printPlayerWinsMsg();
						this.#cleanUp();
					}
				}
				this.#humanPlayer.setPosition(nextPosition);
				GameBoardUi.updatePlayerPosition(PlayerType.HUMAN, nextPosition);
			}
		}
	};

	#handleComputerMovement() {
		const directionsCopy = [...this.#directions];
		let nextPosition = {};
		let canMove = false;

		// SET DIRECTION GET DIRECTION
		// 20% CHANCE OF CHANGING DIRECTION
		// IF COLLISION CHANGE DIRECTION

		const distanceX = this.#computerPlayer.position.x - this.#humanPlayer.position.x;
		const absDistanceX = Math.abs(distanceX);
		const distanceY = this.#computerPlayer.position.y - this.#humanPlayer.position.y;
		const absDistanceY = Math.abs(distanceY);
		if (this.#computerPlayer.huntHuman(this.#dimensions, absDistanceX, absDistanceY)) {
			if (absDistanceX < absDistanceY) {
				if (distanceX > 0) {
					this.#computerPlayer.direction = directionsCopy[0];
				} else if (distanceX === 0) {
					if (distanceY > 0) {
						this.#computerPlayer.direction = directionsCopy[2];
					} else {
						this.#computerPlayer.direction = directionsCopy[3];
					}
				} else {
					this.#computerPlayer.direction = directionsCopy[1];
				}
			} else {
				if (distanceY > 0) {
					this.#computerPlayer.direction = directionsCopy[2];
				} else if (distanceY === 0) {
					if (distanceX > 0) {
						this.#computerPlayer.direction = directionsCopy[0];
					} else if (distanceX === 0) {
						// ZELFDE VAK
						this.#humanPlayer.loseLife();
						this.#gameState.removeLife();
						OutputService.updateLivesCount(this.#humanPlayer.lives);
						if (this.#gameState.computerWins()) {
							OutputService.printComputersWinsMsg();
							this.#cleanUp();
						}
					} else {
						this.#computerPlayer.direction = directionsCopy[1];
					}
				} else {
					this.#computerPlayer.direction = directionsCopy[3];
				}
			}
		}

		if (!this.#computerPlayer.direction) {
			this.#computerPlayer.direction = directionsCopy[Math.floor(Math.random() * directionsCopy.length)];
		}

		nextPosition = this.#computerPlayer.nextPosition(this.#computerPlayer.direction);
		canMove = this.#gameState.canMove(nextPosition);
		while (!canMove) {
			this.#computerPlayer.direction = directionsCopy.splice(Math.floor(Math.random() * directionsCopy.length), 1)[0];
			nextPosition = this.#computerPlayer.nextPosition(this.#computerPlayer.direction);
			canMove = this.#gameState.canMove(nextPosition);
		}
		//edge case verwijderd waarbij computer opgesloten zou zitten
		this.#computerPlayer.setPosition(nextPosition);
		GameBoardUi.updatePlayerPosition(PlayerType.COMPUTER, nextPosition);
	}

	#cleanUp() {
		document.removeEventListener("keydown", this.#handleUserInput);
		clearInterval(this.#computerMovementInterval);
	}
}

export default Schattenjager;
