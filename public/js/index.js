import Schattenjager from "./controllers/Schattenjager";

const schattenjager = new Schattenjager(10, 30, 200, 20, 1);

function isCollision(x, y) {
	const square = document.getElementById(`x${x}y${y}`);
	console.log(`${x}${y}`);
	console.log(square);
	return !square.classList.contains("grass");
}
