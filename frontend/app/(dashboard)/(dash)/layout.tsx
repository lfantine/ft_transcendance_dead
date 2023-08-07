'use client'

import axios, { AxiosInstance } from 'axios';
import style from './dash_layout.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import io from "socket.io-client";
import { routes } from '@/utils/route';
import { sleep } from '@/(component)/other/utils';

export default function DashLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { push } = useRouter();
  let tsocket: any;
  const [socket, setSocket] = useState(tsocket);
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
          console.log('socket : ' + socket);
          socketInitializer();
        }
      } catch (e) {
        push("/")
      }
    };

    checkLog();
  }, [])

  async function socketInitializer() {
    const Socket = io('https://localhost', {
			path: '/api/socket', // Chemin personnalisé ici
		});
    setSocket(Socket);
    console.log('socket : ' + Socket);

    if (Socket === undefined)
      return ;

    Socket.on('connect', async () => {
      console.log('Connecté au serveur Socket.IO');
    });

    Socket.on('disconnect', () => {
      console.log('Déconnecté du serveur Socket.IO');
      if (disconnecting) {
        socket.close();
      }
    });

    Socket.on('Uconnected', function(username) {
      console.log('Uconnected recu');
      addNotif("New User", `${username} is connected`, 1);
    });

    Socket.on('test', function(id: any, data: any) {
      console.log('test recu');
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

  const addNotif = async (title : string, content: string, type: number) => {
    console.log('launch addnotif');
    const banner = document.getElementById('notifbanner');
    const notif = document.createElement('div');
    if (type === 0) {notif.classList.add(style.notifError);}
    else if (type === 1) {notif.classList.add(style.notifConnected);}
    else if (type === 2) {notif.classList.add(style.notifSystem);}
    else if (type === 3) {notif.classList.add(style.notifNone);}

    const notifTitle = document.createElement('h4');
    notifTitle.classList.add(style.notifTitle);
    notifTitle.innerText = title + ' :';
    notif.appendChild(notifTitle);

    const notifContent = document.createElement('p');
    notifContent.classList.add(style.notifContent);
    notifContent.innerText = content;
    notif.appendChild(notifContent);

    notif.classList.add(style.notifanimate);
    if (banner) {
      banner.appendChild(notif);
      await sleep(5000);
      notif.remove();
    }
  }

  const createNotif = () => {
    addNotif("Error", "notif test", 0);
  }
  const createNotif2 = () => {
    addNotif("New User", "lfantine is connected", 1);
  }
  const createNotif3 = () => {
    addNotif("Test system", "server will restart", 2);
  }
  const createNotif4 = () => {
    addNotif("Test other", "notification empty", 3);
  }
  const sendPing = () => {
    socket.emit('test', "test");
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
              <button className={style.selectablebuttonMin} onClick={profil_page}>Profile</button>
              <button className={style.selectablebuttonMin} onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
      <div className={style.notifBanner} id='notifbanner'>
        {/* <div className={style.notifError}>
          <h4 className={style.notifTitle}>Error :</h4>
          <p className={style.notifContent}>register failed</p>
        </div>
        <div className={style.notifConnected}>
          <h4 className={style.notifTitle}>User Connected :</h4>
          <p className={style.notifContent}>lfantine is connected</p>
        </div> */}
      </div>
      <button onClick={createNotif}>new notif</button>
      <button onClick={createNotif2}>new notif</button>
      <button onClick={createNotif3}>new notif</button>
      <button onClick={createNotif4}>new notif</button>
      <button onClick={sendPing}>Send Ping</button>
      {children}
    </main>
  )
}
