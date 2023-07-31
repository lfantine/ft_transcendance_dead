'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import url from 'url';
import axios, { AxiosInstance } from 'axios';
import { AuthResponse } from '@/(component)/other/utils';

export default function ConnectPage() {
  const { query } = url.parse(window.location.href, true);
	const code = query.code;
  const { push } = useRouter();

  useEffect(() => {
    console.log(code);
    const takeToken = async () => {
			const { query } = url.parse(window.location.href, true);
			const code = query.code;	
			if (code){
				try {
					const axiosI: AxiosInstance = axios.create({
						baseURL: '',
					});
					console.log('attente de reponse');
					const rep = await axiosI.post('https://localhost/api/auth/login42', {code: code}, { withCredentials: true,});
					console.log('reponse recu !');
					console.log(rep.data);
					if (!rep.data.error)
					{
						console.log('You are now logged in !');
						localStorage.setItem('log', 'yes');
						push('/MENU');
					}
					else{
						console.log('error');
						localStorage.setItem('log', 'no');
						push('');
					}
					return ;
				} catch (e) {
					console.log('error');
					localStorage.setItem('log', 'no');
					push('');
				}
			}
			else
			{
				localStorage.setItem('log', 'no');
				push('');
			}
		};

		takeToken();
  }, []);

  // Reste de votre code...

  return (
    <main>
      <div style={{height: '10px', width: '100%'}}></div> {/* cette ligne est fait pour cancel le probleme de top margin*/}
    </main>
  );
}
