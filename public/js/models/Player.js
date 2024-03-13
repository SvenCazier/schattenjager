//Player.js

"use strict";

class Player {
	#x;
	#y;

	constructor({ x, y }) {
		this.#x = x;
		this.#y = y;
	}

	setPosition({ x, y }) {
		this.#x = x;
		this.#y = y;
	}

	get position() {
		return { x: this.#x, y: this.#y };
	}

	moveUp() {}
	moveDown() {}
	moveLeft() {}
	moveRight() {}
}

export default Player;
