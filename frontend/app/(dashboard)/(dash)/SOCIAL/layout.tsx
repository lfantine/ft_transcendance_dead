'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosInstance } from 'axios';
import style from './menu.module.css';
import { useSocketContext } from '../layout';
import { routes } from '@/utils/route';

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode
}) {
	const { push } = useRouter();
  const socket = useSocketContext();

  useEffect(() => {
    const ctc = document.getElementById('ctc');
    if (!ctc)
      return ;
    ctc.classList.add(style.selected);
  })

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
            <div className={style.formContent}></div>
            <div style={{flex: '0 0 20px'}}></div>
          </div>
        </div>
        <div className={style.content}>
          {children}
        </div>
      </div>
    </main>
  );
}
