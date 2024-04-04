import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
    transports: ["websocket"],
});

// export const socket = io("https://travel-blogs-server.cyclic.app", {
//     transports: ["websocket"],
// });