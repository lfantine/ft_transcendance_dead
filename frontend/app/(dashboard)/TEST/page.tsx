'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import url from 'url';
import axios, { AxiosInstance } from 'axios';
import { AuthResponse } from '@/(component)/other/utils';
import style from './test.module.css';

export default function ConnectPage() {
	const { query } = url.parse(window.location.href, true);
	const code = query.code;
	const { push } = useRouter();


	const logout = async () => {
		try {
			console.log('test');
			const axiosI: AxiosInstance = axios.create({
				baseURL: '',
			});
			const rep = await axiosI.post('https://localhost/api/auth/logout',  { withCredentials: true});
			push("/");
		} catch (e) {
			console.log("test error");
		}
	}

  // Reste de votre code...

  return (
    <main>
      <div style={{height: '10px', width: '100%'}}></div> {/* cette ligne est fait pour cancel le probleme de top margin*/}
	<h1 className={style.title}>COUCOU</h1>
	<button onClick={logout} className={style.button}> DECONNECTION </button>
    </main>
  );
}
