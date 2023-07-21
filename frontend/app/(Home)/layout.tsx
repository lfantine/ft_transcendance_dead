'use client'

import { useRouter } from 'next/navigation';
import style from './home_layout.module.css'
import axios, { AxiosInstance } from 'axios';
import { useEffect } from 'react';

export default function HomeLayout({
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
        if (rep.data)
          push("/TEST")
      } catch (e) {
        console.log("test error");
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
