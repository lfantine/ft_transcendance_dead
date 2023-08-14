'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import url from 'url';
import axios, { AxiosInstance } from 'axios';
import { AuthResponse } from '@/(component)/other/utils';
import style from './menu.module.css';
import { useSocketContext } from '../layout';
import { number } from 'joi';

export default function ConnectPage() {
	const { query } = url.parse(window.location.href, true);
	const code = query.code;
	const { push } = useRouter();
  const socket = useSocketContext();

  const [catMess, setCatMess] = useState(false);
  const [catChan, setCatChan] = useState(false);

  // Reste de votre code...

  useEffect(() => {
    setCatChan(false);
    setCatMess(false);
      MEP();
      // box.addEventListener('wheel', handleWheel);
      return () => {
        // box.removeEventListener('wheel', handleWheel);
      };
    }, []);

  const MEP = () => {
    const catM = document.getElementById('catMess_');
    const catC = document.getElementById('catChan_');
    if (!catM || !catC)
      return ;
    if (catMess) { catM.classList.remove(style.hidden); }
    else { catM.classList.add(style.hidden); }
    if (catChan) { catC.classList.remove(style.hidden); }
    else { catC.classList.add(style.hidden); }
  }

  const MessOnMouseOver = () => {
    const div = document.getElementById('catMess');
    if (!div)
      return ;
    div.innerText = '-Message-';
  }
  const MessOnMouseOut = () => {
    const div = document.getElementById('catMess');
    if (!div)
      return ;
    div.innerText = '--Message--';
  }
  const Messtoggle = () => {
    setCatMess(!catMess);
    const catM = document.getElementById('catMess_');
    if (!catM)
      return ;
    if (catMess) { catM.classList.remove(style.hidden); }
    else { catM.classList.add(style.hidden); }
  }
  const ChanOnMouseOver = () => {
    const div = document.getElementById('catChan');
    if (!div)
      return ;
    div.innerText = '-Channel-';
  }
  const ChanOnMouseOut = () => {
    const div = document.getElementById('catChan');
    if (!div)
      return ;
    div.innerText = '--Channel--';
  }
  const Chantoggle = () => {
    setCatChan(!catChan);
    const catC = document.getElementById('catChan_');
    if (!catC)
      return ;
    if (catChan) { catC.classList.remove(style.hidden); }
    else { catC.classList.add(style.hidden); }
  }

  return (
    <main className={style.main}>
      <div style={{flex: '0 0 110px'}}></div> {/* cette ligne est fait pour cancel le probleme de top margin*/}
      <div className={style.panel}>
        <div className={style.selectChannelBox}>
          <div className={style.selectChannel}>
            <div className={style.catName} id='catMess' onMouseOver={MessOnMouseOver} onMouseOut={MessOnMouseOut} onClick={Messtoggle}>--Message--</div>
            <div className={style.catName_} id='catMess_'></div>
            <div className={style.catName} id='catChan' onMouseOver={ChanOnMouseOver} onMouseOut={ChanOnMouseOut} onClick={Chantoggle}>--Channel--</div>
            <div className={style.catName_} id='catChan_'></div>
          </div>
        </div>
        <div className={style.chatBox}></div>
        <div className={style.friendOnlineBox}>
          <div className={style.friendOnline}>
            <div style={{margin: 'auto', fontSize: '30px', width: 'fit-content', height: 'fit-content', marginTop: '10px'}}>Friends :</div>
          </div>
        </div>
      </div>
    </main>
  );
}
