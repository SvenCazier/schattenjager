import Schattenjager from "./controllers/Schattenjager";

const schattenjager = new Schattenjager(30, 200, 20, 10, 1);

document.getElementById("reset").addEventListener("click", () => {
	schattenjager.reset();
});
