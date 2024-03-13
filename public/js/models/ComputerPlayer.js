//ComputerPlayer.js

"use strict";

import Player from "./Player";

class ComputerPlayer extends Player {
	#speed = 0;

	constructor(speed, position = { x: 0, y: 0 }) {
		super(position);
		this.#speed = speed;
	}

	get speed() {
		return this.#speed;
	}
}

export default ComputerPlayer;
