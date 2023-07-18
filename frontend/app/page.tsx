'use client'

import Image from 'next/image'
import Style from './Home.module.css'
import { useEffect, useState } from 'react'
import Hnav from '@/(component)/Home_nav/home_nav_bar'
import { useRouter } from 'next/navigation'

const Wscaling = () => {
  const pageWidth = window.innerWidth;
  const W = document.getElementById("W");
  if (W == null)
    return "error";
    if (pageWidth <= 800){
      return "Welcome";
    }
    else if (pageWidth <= 1700){
      return ("Welcome to Pong game !");
    }
    else
      return "Welcome to the best Pong game and ft_transcendance !";
} 

export default function Home() {

  const [title, setTitle] = useState("Welcome");

  useEffect(() => {
    setTitle(Wscaling());
  }, []);

  window.addEventListener('resize', function() {
    setTitle(Wscaling());
  });

  return (
    <main className={Style.Main}>
      <div className={Style.Page}>
        <div style={{height: '50px', width: '100%'}}></div>
        <div className={Style.W}><h1 id="W" className={Style.soft}>{title}</h1></div>
        <div style={{height: '50px', width: '100%'}}></div>
        <Hnav navActive={true} />
      </div>
    </main>
  )
}
