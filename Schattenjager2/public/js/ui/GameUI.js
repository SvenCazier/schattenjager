// GameUI.js

class GameUI {
	static create() {
		document.body.innerHTML = "";
		const resetButton = document.createElement("button");

		resetButton.id = "reset";
		resetButton.setAttribute("role", "reset");
		resetButton.innerText = "Reset game board";

		const tableElement = document.createElement("table");
		tableElement.id = "boardTable";

		const mainElement = document.createElement("main");
		mainElement.append(resetButton);
		mainElement.append(tableElement);

		const scoreTitle = document.createElement("h2");
		scoreTitle.innerText = "Score";
		const livesParagraph = document.createElement("p");
		livesParagraph.id = "lives";
		const treasuresParagraph = document.createElement("p");
		treasuresParagraph.id = "treasures";
		const scoreElement = document.createElement("article");
		scoreElement.append(scoreTitle);
		scoreElement.append(livesParagraph);
		scoreElement.append(treasuresParagraph);

		const gameLogTitle = document.createElement("h2");
		gameLogTitle.innerText = "Game log:";
		const outputElement = document.createElement("output");
		outputElement.id = "output";
		const gameLogElement = document.createElement("article");
		gameLogElement.append(gameLogTitle);
		gameLogElement.append(outputElement);

		const asideElement = document.createElement("aside");
		asideElement.append(scoreElement);
		asideElement.append(gameLogElement);

		const sectionElement = document.createElement("section");
		sectionElement.id = "gameUI";
		sectionElement.append(mainElement);
		sectionElement.append(asideElement);
		document.body.append(sectionElement);
	}
}

export default GameUI;
