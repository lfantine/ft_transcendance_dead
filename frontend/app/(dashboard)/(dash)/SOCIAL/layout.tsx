'use client'

import React, { useEffect, useState, createContext, useContext } from 'react';
import ReactDOMServer from "react-dom/server";
import { useRouter } from 'next/navigation';
import axios, { AxiosInstance } from 'axios';
import style from './menu.module.css';
import { useSocketContext } from '../layout';
import { routes } from '@/utils/route';
import { AiOutlineUser, AiFillMessage } from "react-icons/ai";


function createDOMElementWithIcon(iconComponent: any) {
  // Créez un conteneur div
  const container = document.createElement("div");

  // Rendez le composant React en HTML
  const iconHTML = ReactDOMServer.renderToStaticMarkup(iconComponent);

  // Ajoutez le HTML généré dans le conteneur div
  container.innerHTML = iconHTML;

  return container;
}

const waitingForData: any = null;
const ProfilContext = createContext(waitingForData);

export function useProfilContext() {
  return useContext(ProfilContext);
}

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode
}) {
	const { push } = useRouter();
  const socket = useSocketContext();
  const [profil, setProfilSearched] = useState('none');

  const MAJprofilSearched = (value: string) => {
    setProfilSearched(value);
  };

  useEffect(() => {

    const panelUserRecent = async () => {
      const axiosI: AxiosInstance = axios.create({
				baseURL: '',
			});
			const {data} = await axiosI.get('https://localhost/api/dashboard/getRecentUser', { withCredentials: true});
      console.log(data);
      const zone = document.getElementById('user_content');
      for (let index = data.data.length-1; index >= 0; index--) {
        console.log('user = ' + data.data[index]);
        const user_case = document.createElement('div');
        user_case.classList.add(style.user_case);

        const user_case_name = document.createElement('div');
        user_case_name.classList.add(style.user_case_name);
        user_case_name.innerText = data.data[index];
        user_case.appendChild(user_case_name);

        const user_case_button_section = document.createElement('div');
        user_case_button_section.classList.add(style.user_case_button_section);

        const user_case_icon1 = createDOMElementWithIcon(<AiOutlineUser className={style.user_case_icon}/>);
        user_case_icon1.classList.add(style.user_case_icon_box);
        user_case_icon1.addEventListener('click', goProfil(data.data[index]));
        user_case_button_section.appendChild(user_case_icon1);
        
        const user_case_icon2 = createDOMElementWithIcon(<AiFillMessage className={style.user_case_icon}/>);
        user_case_icon2.classList.add(style.user_case_icon_box);
        user_case_button_section.appendChild(user_case_icon2);

        user_case.appendChild(user_case_button_section);


        zone?.appendChild(user_case);
      }
    };

    const ctc = document.getElementById('ctc');
    if (!ctc)
      return ;
    ctc.classList.add(style.selected);

    panelUserRecent();
  }, [])

  const contactPage = () => {
    const com = document.getElementById('com');
    const ctc = document.getElementById('ctc');
    if (!ctc || !com)
      return ;
    ctc.classList.add(style.selected);
    com.classList.remove(style.selected);
    push(routes.SOCIAL);
  }

  const comPage = () => {
    const com = document.getElementById('com');
    const ctc = document.getElementById('ctc');
    if (!ctc || !com)
      return ;
    com.classList.add(style.selected);
    ctc.classList.remove(style.selected);
    push(routes.COM);
  }

  const goProfil = (userName: string) => {
    return async () => {
      contactPage();
      setProfilSearched(userName);
    };

    // La fonction est full inverser et Me est l'amis et friend est me Mais tkt j'ai aussi inverser dans le backend et ca fonctionne
  };

  return (
    <main className={style.main}>
      <div style={{flex: '0 0 110px'}}></div> {/* cette ligne est fait pour cancel le probleme de top margin*/}
      <div className={style.panel}>
        <div className={style.list}>
          <div className={style.selector}>
            <button className={style.selectable} onClick={comPage} id='com'>Communication</button>
            <button className={style.selectable} onClick={contactPage} id='ctc'>Contact</button>
          </div>
          <div className={style.form}>
            <div className={style.formTitle}>CONTACT :</div>
            <div className={style.formContent} id='user_content'>

            </div>
            <div style={{flex: '0 0 0px'}}></div>
          </div>
        </div>
        <div className={style.content}>
          <ProfilContext.Provider value={{profil, MAJprofilSearched}}>
            {children}
          </ProfilContext.Provider>
        </div>
      </div>
    </main>
  );
}
