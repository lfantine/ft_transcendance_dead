'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function connect() {

  const [title, setTitle] = useState("Welcome");

  return (
    <main>
      <div style={{height: '10px', width: '100%'}}></div> {/* cette ligne est fait pour cancel le probleme de top margin*/}
      <p>CREDIT</p>
    </main>
  )
}
