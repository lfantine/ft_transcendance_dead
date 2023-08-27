'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosInstance } from 'axios';
import { useSocketContext } from '../../layout';

function ComPage() {
	const { push } = useRouter();
  const socket = useSocketContext();

  // Reste de votre code...

  useEffect(() => {
      // box.addEventListener('wheel', handleWheel);
      return () => {
        // box.removeEventListener('wheel', handleWheel);
      };
    }, []);

  return (
    <main>
      <div style={{flex: '0 0 110px'}}></div> {/* cette ligne est fait pour cancel le probleme de top margin*/}
      <div>COM</div>
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

export default ComPage;