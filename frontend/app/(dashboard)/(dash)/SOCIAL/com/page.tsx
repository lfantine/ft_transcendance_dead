'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosInstance } from 'axios';
import { useSocketContext } from '../../layout';
import style from './style.module.css';
import { AiOutlineSend } from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import { useProfilContext } from '../layout';
import { send } from 'process';
import { BiBlock } from "react-icons/bi";

function ComPage() {
	const { push } = useRouter();
  const socket = useSocketContext();
  const {profil, MAJprofilSearched, page} = useProfilContext();

  const [playerName, setPlayerName] = useState('Loading..');
  const [meUid, setMeUid] = useState('Loading..');

  // Reste de votre code...

  useEffect(() => {
    if (page === 0) {return ;}
    console.log(profil);
    const button = document.getElementById('blockBut');
    if (!button){return ;}
    button.classList.add(style.hidden);
    if (profil !== 'none') {
      console.log('IL Y A UN PROFIL : ' + profil);
      MEP(profil);
    } else {
      console.log('PAS DE PROFIL : ' + profil);
    }
    socketInitializer();
    return ;
  }, [profil]);

  const blockMep = async (user: string) => {
    try {
      const axiosI: AxiosInstance = axios.create({
        baseURL: '',
      });
      const {data} = await axiosI.get('https://localhost/api/dashboard/blockUser' , { withCredentials: true});
      const button = document.getElementById('blockBut');
      if (!button){return ;}
      button.classList.remove(style.hidden);
      if (!data.error && data.data) {
        setBlock(true);
      }
    } catch (e) {

    }
  }

  const MEP = async (user: string) => {
    try {
      const axiosI: AxiosInstance = axios.create({
        baseURL: '',
      });
      const {data} = await axiosI.post('https://localhost/api/dashboard/privateMessage', {'dest': user} , { withCredentials: true});
      console.log(data.data); // data.data.length pour longueur
      setPlayerName(user);
      const chatSpace = document.getElementById('chatSpace');
      if (!chatSpace) {return ;}
      chatSpace.innerHTML = '';
      setMeUid(data.you);
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].isDate) {
          const element = document.createElement('div');
          element.classList.add(style.chatSpaceDate);

          const bar1 = document.createElement('div');
          bar1.classList.add(style.chatSpaceDateBar);
          element.appendChild(bar1);

          const text = document.createElement('div');
          text.classList.add(style.chatSpaceDateText);
          text.innerText = data.data[i].text;
          element.appendChild(text);

          const bar2 = document.createElement('div');
          bar2.classList.add(style.chatSpaceDateBar);
          element.appendChild(bar2);

          chatSpace.appendChild(element);
        } else {
          if (data.data[i].author === data.you) {
            const element = document.createElement('div');
            element.classList.add(style.chatSpaceMessageMe);

            const text = document.createElement('div');
            text.classList.add(style.chatSpaceMessageText);
            text.innerText = data.data[i].text;
            element.appendChild(text);

            chatSpace.appendChild(element);

          } else if (data.data[i].author === data.dest) {
            const element = document.createElement('div');
            element.classList.add(style.chatSpaceMessageYou);

            const text = document.createElement('div');
            text.classList.add(style.chatSpaceMessageText);
            text.innerText = data.data[i].text;
            element.appendChild(text);

            chatSpace.appendChild(element);

          }
        }
      }
      chatSpace.scrollTop = chatSpace.scrollHeight;
      socket.emit('majRecent', {});
      console.log('end');
    } catch (e) {

    }
  }

  const socketInitializer = () => {
    socket.on('message', (data: any) => {
      const chatSpace = document.getElementById('chatSpace');
      if (!chatSpace) {return ;}
      if (data.author === profil) {
        const chatSpace = document.getElementById('chatSpace');
        if (!chatSpace) {return ;}
        const element = document.createElement('div');
        element.classList.add(style.chatSpaceMessageYou);

        const text = document.createElement('div');
        text.classList.add(style.chatSpaceMessageText);
        text.innerText = data.message;
        element.appendChild(text);

        chatSpace.appendChild(element);
        chatSpace.scrollTop = chatSpace.scrollHeight;
      }
    });
  }

  const verifInput = (str: string) => {
    for (let i = 0; i < str.length; i++) {
      if ((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z') || (str[i] >= '0' && str[i] <= '9')) {return true;}
    }
    return false;
  }

  const Send = async () => {
    const input = document.getElementById('textInput') as HTMLTextAreaElement;
    if (!input) {return ;}
    if (input.value.length === 0) {return ;}
    if (!verifInput(input.value)) {
      input.value = '';
      return ;
    }
    try {
      const axiosI: AxiosInstance = axios.create({
        baseURL: '',
      });
      const {data} = await axiosI.post('https://localhost/api/dashboard/sendPrivateMessage', {'dest': playerName, 'message': input.value} , { withCredentials: true});
      if (data.error) {return ;}
      const chatSpace = document.getElementById('chatSpace');
      if (!chatSpace) {return ;}
      const element = document.createElement('div');
      element.classList.add(style.chatSpaceMessageMe);

      const text = document.createElement('div');
      text.classList.add(style.chatSpaceMessageText);
      text.innerText = input.value;
      element.appendChild(text);

      chatSpace.appendChild(element);
      
      socket.emit('message', {
        mess: input.value,
        dest: playerName,
        author: meUid,
      });
      chatSpace.scrollTop = chatSpace.scrollHeight;
      input.value = '';
    } catch (e) {

    }
  }

  // ######## Pour la gestion du boutons de blockage

  const [isBlock, setBlock] = useState(false);
  const [blocktext, setBlockText] = useState('Block');

  useEffect(() => {
    const button = document.getElementById('blockBut');

    if (!button) {return ;}
      button.classList.remove(style.blockedBut);
      button.classList.remove(style.blockBut);
    if (isBlock) {
      setBlockText('blocked');
      button.classList.add(style.blockedBut);
    } else {
      setBlockText('block');
      button.classList.add(style.blockBut);
    }

    return () => {
    }
  }, [isBlock])

  return (
    <main className={style.main}>
      <div style={{flex: '0 0 110px'}}></div> {/* cette ligne est fait pour cancel le probleme de top margin*/}
      <div className={style.cadre}>
        <div className={style.chatTitle}><div className={style.chatTitletext}><div className={style.chatTitletextAjust}>{playerName}</div></div><div className={style.chatTitletextBoutons}><button className={style.blockBut} id='blockBut'>{blocktext} <BiBlock></BiBlock></button></div></div>
        <div className={style.chatSpace} id='chatSpace'>
          {/* <div className={style.chatSpaceDate}><div className={style.chatSpaceDateBar}></div><div className={style.chatSpaceDateText}>10/10/23</div><div className={style.chatSpaceDateBar}></div></div> */}
          {/* <div className={style.chatSpaceMessageYou}>
            <div className={style.chatSpaceMessageText}>Hey, ca va ?</div>
          </div>
          <div className={style.chatSpaceMessageMe}>
            <div className={style.chatSpaceMessageText}>He ho gros</div>
          </div> */}
        </div>
        <div className={style.chatWrite}><textarea className={style.chatWriteInput} id='textInput'></textarea><BiSend className={style.chatWriteButton} onClick={Send}></BiSend></div>
      </div>
    </main>
  );
}

export default ComPage;