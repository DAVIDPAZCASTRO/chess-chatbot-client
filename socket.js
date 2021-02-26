// import * as io from "https://cdn.socket.io/3.1.1/socket.io.min.js";
import * as io from "./node_modules/socket.io/client-dist/socket.io.js";

export const createSocket = () => {
  const clientSocket = io("wss://localhost:3000");

  clientSocket.on("connect", (socket) => {
    console.log("connect");
    console.log(socket);
  });

  clientSocket.on("error", (socket) => {
    console.log(socket);
  });

  clientSocket.on("disconnect", (socket) => {
    console.log("disconnect");
    console.log(socket);
  });

  return clientSocket;
};
