'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosInstance } from 'axios';
import { useSocketContext } from '../../layout';
import style from './style.module.css';
import PlayerSearch from '@/(component)/playerSearch/playerSearch';
import { getRandomInt } from '@/utils/random';
import { sleep } from '@/(component)/other/utils';
import { useProfilContext } from '../layout';

function ComPage() {
	const { push } = useRouter();
  const socket = useSocketContext();
  const [searchPlayerActive, setSearchPlayerActive] = useState(false);
  const [value, setValue] = useState('Nartyy');
  const [rd, setRd] = useState(10);
  const {profil, MAJprofilSearched} = useProfilContext();

  // Reste de votre code...

  useEffect(() => {
    toggleSearch(searchPlayerActive);
    if (profil !== 'none') {
      console.log('profile pas none : ' + profil);
      goProfil(profil);
    }
    // toggleSearch(true);

    return ;
  }, [searchPlayerActive, profil]);

  const toggleSearch = (actif: boolean) => {
    const SPpanel = document.getElementById('searchPlayer');
      if (!SPpanel)
        return ;
      if (actif) {SPpanel.classList.remove(style.hidden);}
      else {SPpanel.classList.add(style.hidden);}
  }

  const goProfil = async (profilname: string) => {
    if (typeof document === undefined) {return ;}
    MAJprofilSearched('none');
    const input = document.getElementById('i') as HTMLInputElement;
    const SPpanel = document.getElementById('searchPlayer');
    if (!input || !SPpanel)
      return ;
    setSearchPlayerActive((actual) => {
      return true;
    });
    setRd(getRandomInt(101, 200));
    setValue(profilname);
  }

  const search = async () => {
    if (typeof document === undefined) {return ;}
    MAJprofilSearched('none');
    const input = document.getElementById('i') as HTMLInputElement;
    const SPpanel = document.getElementById('searchPlayer');
    if (!input || !SPpanel)
      return ;
    setSearchPlayerActive((actual) => {
      return true;
    });
    setRd(getRandomInt(0, 100));
    setValue(input.value);
  }
 
  return (
    <main className={style.main}>
      <div className={style.navBar}>
        <input type='text' id='i' placeholder='a user id' className={style.navI} maxLength={30}></input>
        <button className={style.navB} onClick={search}>SEARCH</button>
      </div>
      <div className={style.content}>
        <div className={style.searchPlayerPanel} id='searchPlayer'>
          <PlayerSearch player={value} rd={rd}/>
        </div>
      </div>
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