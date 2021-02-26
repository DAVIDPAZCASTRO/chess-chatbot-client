import { createSocket } from "./ws.js";

const socket = createSocket();

let board = new ChessBoard("board", "start");
let game = new Chess();
let moves;
console.log("holamundo");

const highlight = (square) => {
  document.querySelector(`.square-${square}`).classList.toggle("highlight");
  console.log(document.querySelector(`.square-${square}`));
};

const onMouseoverSquare = (square, piece) => {
  console.log("square", square, "piece", piece);
  moves = game.moves({ square, verbose: true }).map(({ to }) => to);
  console.log("moves", moves);
  [...moves, square].forEach(highlight);
};

const removeHighlight = () => {
  document
    .querySelectorAll(".highlight")
    .forEach((element) => element.classList.toggle("highlight"));
};

const onMouseoutSquare = () => {
  removeHighlight();
};

const onDragStart = (square, piece) => {
  return !game.game_over();
};

const onDrop = (from, to) => {
  let move = game.move({ from, to, promotion: "q" });
  if (!move) return "snapback";
  socket.send(JSON.stringify(move));
  if (game.game_over()) alert("Game over!");
};

const onSnapEnd = () => {};

let config = {
  draggable: true,
  position: "start",
  onMouseoverSquare,
  onMouseoutSquare,
  onDragStart,
  onDrop,
  onSnapEnd,
};

board = new ChessBoard("board", config);
