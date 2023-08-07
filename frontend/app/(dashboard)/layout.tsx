'use client'

import axios, { AxiosInstance } from 'axios';
import style from './dash_layout.module.css'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import io from "socket.io-client";
import { routes } from '@/utils/route';

export default function DashLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { push } = useRouter();

  const logout = async () => {
		try {
			const axiosI: AxiosInstance = axios.create({
				baseURL: '',
			});
			const rep = await axiosI.post('https://localhost/api/auth/logout',  { withCredentials: true});
			push("/");
		} catch (e) {
			console.log("logout error");
		}
	}

  const home_page = () => {
    push(routes.MENU);
  }

  const soc_page = () => {
    push(routes.SOCIAL);
  }

  return (
    <main className={style.Main}>
      {children}
    </main>
  )
}
