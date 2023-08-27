'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import style from './H_credit.module.css'
import Loading1 from '@/(component)/loading1/loading1';
import Loading2 from '@/(component)/loading2/loading2';

function connect() {

  useEffect(() => {
    const launchTag = async () => {

    };

    launchTag();
  }, []);

  return (
    <main>
      <div style={{height: '10px', width: '100%'}}></div> {/* cette ligne est fait pour cancel le probleme de top margin*/}
      <h1 className={style.credit}>creditos</h1>
      <div style={{height: '100px', width: '100%'}}></div>
      <div className={style.loading}>
        <Loading1/>
      </div>
      <div style={{height: '60px', width: '100%'}}></div>
      <div className={style.loading}>
        <Loading2/>
      </div>
      {/* <div className={style.content}>
        <div style={{height: '100px', width: '100px', backgroundColor: 'red'}}></div>
        <div style={{height: '100px', width: '100px', backgroundColor: 'blue'}}></div>
      </div> */}
    </main>
  )
}

// export async function getServerSideProps() {
//   // Fetch data from an API or any other data source
//   // none here

//   return {
//     props: {
//     },
//   };
// }

export default connect;