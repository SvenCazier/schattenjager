// OutputService.js

"use strict";

class OutputService {
	static clearMessages() {
		document.getElementById("output").innerHTML = "";
	}

	static printStartMsg() {
		this.#createNewChildWithMsg("Good luck!!");
	}

	static printTreasureMsg() {
		this.#createNewChildWithMsg("Congrats! you found a treasure");
	}

	static printCaughtMsg() {
		this.#createNewChildWithMsg("Caught by enemy...");
	}

	static printComputersWinsMsg() {
		this.#createNewChildWithMsg("Computer wins!");
	}

	static printPlayerWinsMsg() {
		this.#createNewChildWithMsg("Player wins!");
	}

	static updateLivesCount(lives) {
		document.getElementById("lives").innerText = `Lives: ${lives}`;
	}

	static updateTreasureCount(treasures) {
		document.getElementById("treasures").innerText = `Treasures: ${treasures}`;
	}

	static #createNewChildWithMsg(msg) {
		const newChild = document.createElement("p");
		newChild.innerText = msg;
		document.getElementById("output").prepend(newChild);
	}
}

export default OutputService;
