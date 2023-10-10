'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosInstance } from 'axios';
import { useSocketContext } from '../../layout';
import style from './style.module.css';
import { AiOutlineSend } from "react-icons/ai";
import { BiSend } from "react-icons/bi";

function ComPage() {
	const { push } = useRouter();
  const socket = useSocketContext();

  // Reste de votre code...

  useEffect(() => {
      // box.addEventListener('wheel', handleWheel);
      return () => {
        // box.removeEventListener('wheel', handleWheel);
      };
    }, []);

  return (
    <main className={style.main}>
      <div style={{flex: '0 0 110px'}}></div> {/* cette ligne est fait pour cancel le probleme de top margin*/}
      <div className={style.cadre}>
        <div className={style.chatTitle}><div className={style.chatTitletext}>lfantine</div></div>
        <div className={style.chatSpace}>
          <div className={style.chatSpaceDate}><div className={style.chatSpaceDateBar}></div><div className={style.chatSpaceDateText}>10/10/23</div><div className={style.chatSpaceDateBar}></div></div>
          <div className={style.chatSpaceMessageYou}>
            <div className={style.chatSpaceMessageText}>Hey, ca va ?</div>
          </div>
          <div className={style.chatSpaceMessageYou}>
            <div className={style.chatSpaceMessageText}>Test</div>
          </div>
          <div className={style.chatSpaceMessageMe}>
            <div className={style.chatSpaceMessageText}>He ho gros</div>
          </div>
          <div className={style.chatSpaceMessageMe}>
            <div className={style.chatSpaceMessageText}>Me parle plus</div>
          </div>
        </div>
        <div className={style.chatWrite}><textarea className={style.chatWriteInput}></textarea><BiSend className={style.chatWriteButton}></BiSend></div>
      </div>
    </main>
  );
}

export default ComPage;