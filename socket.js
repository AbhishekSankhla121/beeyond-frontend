import io from 'socket.io-client';

const serverUrl = 'http://localhost:5000';
export const socket = io(serverUrl, {
  transports: ["websocket"],
});