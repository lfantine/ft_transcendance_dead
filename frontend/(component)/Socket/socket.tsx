// components/SocketComponent.js
import { useEffect } from "react";
import io from "socket.io-client";

const SocketComponent = () => {

  let socket: any;

  useEffect(() => {
    socketInitializer();
  }, []);

  async function socketInitializer() {
    socket = io('https://localhost', {
			path: '/api/socket', // Chemin personnalisé ici
		});

    console.log('socket = ');
    console.log(socket);

    socket.on('connect', () => {
      console.log('Connecté au serveur Socket.IO');
    });

    socket.on('disconnect', () => {
      console.log('Déconnecté du serveur Socket.IO');
    });
  }

  const logSocket = () => {
    console.log(socket);
  }

  return (
    <button onClick={logSocket}>Log socket</button>
  );
};

export default SocketComponent;
