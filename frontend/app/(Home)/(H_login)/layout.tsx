'use client'

import { useEffect, useState } from 'react'
import style from './login_layout.module.css'
import { useRouter, usePathname } from 'next/navigation'
import { routes } from '../../../utils/route'
import { BsFillDoorOpenFill } from "react-icons/bs";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const {push} = useRouter();
  const [barState, setBarState] = useState(-3);
  const Bar = document.getElementById('bar');
  const currentPath = usePathname();
  
  useEffect(() => {
     if (currentPath == "/register") {
        setBarState(1);
        Bar?.classList.remove(style.bar_log);
        Bar?.classList.add(style.bar_reg);
     }
     else if (currentPath == "/login"){
        setBarState(0);
        Bar?.classList.remove(style.bar_reg);
        Bar?.classList.add(style.bar_log);
    }
  }, [currentPath, barState, Bar]);

  const log_page = () => {
      push(routes.HOME_LOGIN);
  }

  const reg_page = () => {
      push(routes.HOME_REGISTER);
  }

  const exit = () => {
    push(routes.HOME);
  }

  return (
    <main className={style.Main}>
      <div style={{height: '10px', width: '100%'}}></div> {/* cette ligne est fait pour cancel le probleme de top margin*/}
      <h1 className={style.title}>Connection</h1>
      <div style={{height: '35px', width: '100%'}}></div>
      <div className={style.select}>
        <div className={style.selectable} id='log'><button className={style.selectablebutton} onClick={log_page}>Login</button></div>
        <div className={style.selectable} id='reg'><button className={style.selectablebutton} onClick={reg_page}>Register</button></div>
      </div>
      <div className={style.bar} id='bar'></div>
      <div className={style.content}>
        {children}
      </div>
      <div className={style.exit}><button className={style.exitBut} onClick={exit}> Back <BsFillDoorOpenFill style={{margin: '0px 0px -5px 0px',}} /></button></div>
    </main>
  )
}
