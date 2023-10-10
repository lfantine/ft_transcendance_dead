'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import url from 'url';
import axios, { AxiosInstance } from 'axios';
import { AuthResponse } from '@/(component)/other/utils';
import style from './menu.module.css';
import { useSocketContext } from '../layout';

function ConnectPage() {
	const { push } = useRouter();
  const socket = useSocketContext();

  const sendPing = () => {
    socket.emit('test', "test");
  }

  // Reste de votre code...

  return (
    <main>
      <div style={{height: '200px', width: '100%'}}></div> {/* cette ligne est fait pour cancel le probleme de top margin*/}
      <button onClick={sendPing}>APPUIE !</button>
      <canvas style={{height: 300, width: 600, backgroundColor: 'blue'}}></canvas>
    </main>
  );
}

// export async function getServerSideProps() {
//   // Fetch data from an API or any other data source
//   // none here

//   return {
//     props: {
//     },
//   };
// }

export default ConnectPage;