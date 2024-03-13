// OutputService.js

class OutputService {
	static #outputElement = document.getElementById("output");

	static printStartMsg() {
		this.#createNewChildWithMsg("Good luck!!");
	}

	static printTreasureMsg() {
		this.#createNewChildWithMsg("Congrats! you found a treasure");
	}

	static printCaughtMsg() {
		this.#createNewChildWithMsg("Caught by enemy...");
	}

	static #createNewChildWithMsg(msg) {
		const newChild = document.createElement("p");
		newChild.innerText = msg;
		this.#outputElement.prepend(newChild);
	}
}

export default OutputService;
