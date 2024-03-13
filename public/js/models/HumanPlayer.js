//HumanPlayer.js

"use strict";

import Player from "./Player";

class HumanPlayer extends Player {
	#lives = 0;
	#collectedTreasures = 0;

	constructor(lives, position = { x: 0, y: 0 }) {
		super(position);
		this.#lives = lives;
	}

	get lives() {
		return this.#lives;
	}

	get collectedTreasures() {
		return this.#collectedTreasures;
	}

	loseLife() {
		this.#lives--;
	}

	collectTreasure() {
		this.#collectedTreasures++;
	}
}

export default HumanPlayer;
