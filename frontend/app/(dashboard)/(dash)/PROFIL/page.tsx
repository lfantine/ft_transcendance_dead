'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import url from 'url';
import axios, { AxiosInstance } from 'axios';
import { AuthResponse } from '@/(component)/other/utils';
import style from './menu.module.css';

export default function ConnectPage() {
	const { query } = url.parse(window.location.href, true);
	const code = query.code;
	const { push } = useRouter();

  // Reste de votre code...

  return (
    <main>
      <div style={{height: '10px', width: '100%'}}></div> {/* cette ligne est fait pour cancel le probleme de top margin*/}
    </main>
  );
}
