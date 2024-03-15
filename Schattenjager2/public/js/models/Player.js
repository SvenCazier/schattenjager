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

	nextPosition(key) {
		switch (key) {
			case "ArrowUp":
				return { x: this.#x - 1, y: this.#y };
			case "ArrowDown":
				return { x: this.#x + 1, y: this.#y };
			case "ArrowLeft":
				return { x: this.#x, y: this.#y - 1 };
			case "ArrowRight":
				return { x: this.#x, y: this.#y + 1 };
		}
	}
}

export default Player;
