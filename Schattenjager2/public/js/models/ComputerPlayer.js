//ComputerPlayer.js

"use strict";

import Player from "./Player";

class ComputerPlayer extends Player {
	#speed = 0;
	#direction = "";

	constructor(speed, position = { x: 0, y: 0 }) {
		super(position);
		this.#speed = speed;
	}

	get speed() {
		return this.#speed * 200;
	}

	get direction() {
		return this.#direction;
	}

	set direction(direction) {
		this.#direction = direction;
	}

	huntHuman(dimensions, distanceX, distanceY) {
		const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

		let probability = 0.236;
		if (distance <= Math.floor(dimensions * 0.05)) {
			probability = 1;
		} else if (distance <= Math.floor(dimensions * 0.1)) {
			probability = 0.786;
		} else if (distance <= Math.floor(dimensions * 0.15)) {
			probability = 0.618;
		} else if (distance <= Math.floor(dimensions * 0.2)) {
			probability = 0.5;
		} else if (distance <= Math.floor(dimensions * 0.25)) {
			probability = 0.382;
		}

		if (Math.random() <= probability) {
			return true;
		}
		return false;
	}
}

export default ComputerPlayer;
