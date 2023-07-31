'use client'

import axios, { AxiosInstance } from 'axios';
import style from './dash_layout.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import io from "socket.io-client";
import { routes } from '@/utils/route';

export default function DashLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { push } = useRouter();
  let sockett: any;
  const [socket, setSocket] = useState(sockett);
  const [username, setUsername] = useState('Nartyyy');
  const [down, setDown] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);


  useEffect(() => {
    const checkLog = async () => {
      try {
        const axiosI: AxiosInstance = axios.create({
          baseURL: '',
        });
        const rep = await axiosI.get('https://localhost/api/auth/isLogin',  { withCredentials: true});
        if (!rep.data)
          push("/")
        else {
          socketInitializer();
        }
      } catch (e) {
        push("/")
      }
    };

    checkLog();
  }, [])

  async function socketInitializer() {
    const messages = document.getElementById('messages');
    const temp = io('https://localhost', {
			path: '/api/socket', // Chemin personnalisé ici
		});
    setSocket(temp);

    if (socket === undefined)
      return ;

    socket.on('connect', () => {
      console.log('Connecté au serveur Socket.IO');
    });

    socket.on('disconnect', () => {
      console.log('Déconnecté du serveur Socket.IO');
      if (disconnecting) {
        socket.close();
      }
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

    return () => {
      setDisconnecting(true);
      socket.disconnect();
    };
  }

  const logout = async () => {
		try {
      setDisconnecting(true);
      socket.disconnect();
      todown();
			const axiosI: AxiosInstance = axios.create({
				baseURL: '',
			});
			const rep = await axiosI.post('https://localhost/api/auth/logout',  { withCredentials: true});
			push("/");
		} catch (e) {
			console.log("logout error");
		}
	}

  const home_page = () => {
    push(routes.MENU);
  }

  const soc_page = () => {
    push(routes.SOCIAL);
  }

  const game_page = () => {
    push(routes.GAME);
  }

  const profil_page = () => {
    todown();
    push(routes.PROFIL);
  }

  const todown = () => {
    setDown(!down);
    const panel = document.getElementById('panel');
    if (panel) {
      if (!down) {
        panel.classList.remove(style.up);
        panel.classList.add(style.down);
      }
      else {
        panel.classList.remove(style.down);
        panel.classList.add(style.up);
      }
    }
  }

  return (
    <main className={style.Main}>
      <div style={{height: '0px', width: '100%'}}></div>
      <div className={style.banner}>
        <div className={style.allCat}>
          <div className={style.selectable} id='home'><button className={style.selectablebutton} onClick={home_page}>HOME</button></div>
          <div className={style.selectable} id='soc'><button className={style.selectablebutton} onClick={soc_page}>SOCIAL</button></div>
          <div className={style.selectable} id='game'><button className={style.selectablebutton} onClick={soc_page}>GAME</button></div>
        </div>
        <div className={style.ppCat} id='caPo'>
          <div className={style.ppCatP} onClick={todown}>
            <div className={style.userN}>{username}</div>
            <div className={style.userPP}></div>
          </div>
          <div className={style.profilSelectOut}>
            <div className={style.profilSelect} id='panel'>
              <button className={style.selectablebuttonMin} onClick={profil_page}>Profil</button>
              <button className={style.selectablebuttonMin} onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
      {children}
    </main>
  )
}
