'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import style from './H_credit.module.css'

export default function connect() {

  useEffect(() => {
    const launchTag = async () => {

    };

    launchTag();
  }, []);

  return (
    <main>
      <div style={{height: '10px', width: '100%'}}></div> {/* cette ligne est fait pour cancel le probleme de top margin*/}
        <h1 className={style.credit}>creditos</h1>
      <div className={style.content}>
        <div style={{height: '100px', width: '100px', backgroundColor: 'red'}}></div>
        <div style={{height: '100px', width: '100px', backgroundColor: 'blue'}}></div>
      </div>
    </main>
  )
}
