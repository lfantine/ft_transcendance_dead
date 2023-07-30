// components/SocketComponent.js
import { useEffect } from "react";
import io from "socket.io-client";
import style from './socket.module.css';

const SocketComponent = () => {

  let socket: any;

  useEffect(() => {
    socketInitializer();
  }, []);

  async function socketInitializer() {
    const messages = document.getElementById('messages');
    socket = io('https://localhost', {
			path: '/api/socket', // Chemin personnalisé ici
		});

    socket.on('connect', () => {
      console.log('Connecté au serveur Socket.IO');
    });

    socket.on('disconnect', () => {
      console.log('Déconnecté du serveur Socket.IO');
    });

    socket.on('message', function(id: any, data: any) {
      if (messages) {
        messages.innerHTML += `<div className={style.mess}> mess : ${data} </div>`;
      }
    });

    socket.on('other', function(id: any, data: any) {
      if (messages) {
        messages.innerHTML += `<div className={style.mess}> other : ${data} </div>`;
      }
    });
  }

  const logSocket = () => {
    console.log(socket);
  }

  const SendMess = () => {
    const input = document.getElementById('INP') as HTMLInputElement;
    if (input) {
      console.log('send');
      socket.emit('message', input?.value);
      input.value = '';
    }
    else {
      console.log('input est null :' + input);
    }
  }

  const SendOther = () => {
    const input = document.getElementById('INP') as HTMLInputElement;
    if (input) {
      console.log('send');
      socket.emit('other', input?.value);
      input.value = '';
    }
    else {
      console.log('input est null :' + input);
    }
  }

  return (
    <main>
      <div className={style.cadre}>
        <div className={style.title}>MESSAGE</div>
        <div className={style.all} id="messages">
          <div>Coucou</div>
        </div>
        <div className={style.Send}><input type="text" className={style.sendTxt} id="INP"></input><button className={style.sendBut} onClick={SendMess} >Message</button><button className={style.sendBut} onClick={SendOther}>other</button></div>
      </div>
    </main>
  );
};

export default SocketComponent;
