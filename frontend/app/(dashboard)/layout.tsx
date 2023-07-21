'use client'

import axios, { AxiosInstance } from 'axios';
import style from './dash_layout.module.css'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { push } = useRouter();

  useEffect(() => {
    const checkLog = async () => {
      try {
        console.log('test');
        const axiosI: AxiosInstance = axios.create({
          baseURL: '',
        });
        const rep = await axiosI.get('https://localhost/api/auth/isLogin',  { withCredentials: true});
        if (!rep.data)
          push("/")
      } catch (e) {
        push("/")
      }
    };

    checkLog();
  }, [])

  return (
    <main className={style.Main}>
      {children}
    </main>
  )
}
