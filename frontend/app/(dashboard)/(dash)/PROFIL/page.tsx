'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import url from 'url';
import axios, { AxiosInstance } from 'axios';
import { AuthResponse, sleep } from '@/(component)/other/utils';
import style from './menu.module.css';

import { TfiClose, TfiCheck } from "react-icons/tfi";

export default function ConnectPage() {
	const { query } = url.parse(window.location.href, true);
	const code = query.code;
	const { push } = useRouter();

  const [PpSrc, SetPpSrc] = useState('/noUser.jpg');


  const [Uid, setUid] = useState('Loading...');
  const [Uname, setUname] = useState('Loading...');
  const [UnameT, setUnameT] = useState(true);
  const [Is42, setIs42] = useState(false);
  const [Email, setEmail] = useState('Loading...');
  const [Status, setStatus] = useState(-1);
  const [desc, setDesc] = useState('Loading...');
  const [descT, setDescT] = useState(true);

  // Reste de votre code...

  useEffect(() => {
    getuserInfo();
    mep();
  }, []);

  const getuserInfo = async () => {
    try {
			const axiosI: AxiosInstance = axios.create({
				baseURL: '',
			});
			const rep = await axiosI.get('https://localhost/api/dashboard/info',  { withCredentials: true});
			if (rep.data.error === true) {
        console.log("getInfo error");
        return ;
      }
      console.log(rep.data.data);
      setUname(rep.data.data.username);
      setUid(rep.data.data.Uid);
      setIs42(rep.data.data.is42);
      const is42NO = document.getElementById('is42NO');
      const is42YES = document.getElementById('is42YES');
      if (rep.data.data.is42 === true && is42NO) {is42NO.classList.add(style.hidden);}
      else if (rep.data.data.is42 === false && is42YES) {is42YES.classList.add(style.hidden);}
      setEmail(rep.data.data.mail);
      setStatus(rep.data.data.status);
      setDesc(rep.data.data.desc);
    } catch (e) {
			console.log("getInfo error");
		}
  }

  const mep = async () => {
    const UnameInput = document.getElementById('uname_i');
    const UnameInfo = document.getElementById('uname_');

    if (UnameInput && UnameInfo) {
      UnameInfo.classList.remove(style.hidden);
      UnameInput.classList.add(style.hidden);
    }

    const UdescInput = document.getElementById('desc_i');
    const UdescInfo = document.getElementById('desc_');

    if (UdescInput && UdescInfo) {
      UdescInfo.classList.remove(style.hidden);
      UdescInput.classList.add(style.hidden);
    }
  }

  const ToggleUnameChange = () => {
    const UnameInput = document.getElementById('uname_i');
    const UnameInfo = document.getElementById('uname_');
    if (!UnameInfo || !UnameInput )
    return ;
    setUnameT(!UnameT);
    console.log('toggle');

    if (UnameT){
      UnameInput.classList.remove(style.hidden);
      UnameInfo.classList.add(style.hidden);
      const input = document.getElementById('uname_i_i') as HTMLInputElement;
      input.value = Uname;
    }
    else {
      UnameInfo.classList.remove(style.hidden);
      UnameInput.classList.add(style.hidden);
    }
  }

  const ToggleUdescChange = () => {
    const UdescInput = document.getElementById('desc_i');
    const UdescInfo = document.getElementById('desc_');
    if (!UdescInfo || !UdescInput )
    return ;
    setDescT(!descT);
    console.log('toggle');

    if (descT){
      UdescInput.classList.remove(style.hidden);
      UdescInfo.classList.add(style.hidden);
      const input = document.getElementById('desc_i_i') as HTMLInputElement;
      input.value = desc;
    }
    else {
      UdescInfo.classList.remove(style.hidden);
      UdescInput.classList.add(style.hidden);
    }
  }

  const changePP = () => {
    console.log('change PP');
  }

  const changeUsername = async () => {
    console.log('change Uname');
    const axiosI: AxiosInstance = axios.create({
      baseURL: '',
    });
    const input = document.getElementById('uname_i_i') as HTMLInputElement;
    if (input.value === desc) {
      ToggleUnameChange();
      return ;
    }
    try {
      const rep = await axiosI.post('https://localhost/api/dashboard/username',  {'username' : input.value}, { withCredentials: true});
      console.log("rep recu");
      if (rep.data.error === true) {
        console.log("post username error");
      }
      else
        setUname(input.value);
        ToggleUnameChange();
    } catch (e) {
      console.log("post username crash");
      ToggleUnameChange();
    }
  }

  const changeDescription = async () => {
    console.log('change desc');
    const axiosI: AxiosInstance = axios.create({
      baseURL: '',
    });
    const input = document.getElementById('desc_i_i') as HTMLInputElement;
    if (input.value === desc) {
      ToggleUdescChange();
      return ;
    }
    try {
      const rep = await axiosI.post('https://localhost/api/dashboard/desc',  {'desc' : input.value}, { withCredentials: true});
      if (rep.data.error === true) {
        console.log("post desc error");
      }
      else
        setDesc(input.value);
        const info = document.getElementById('desc_') as HTMLInputElement;
        info.value = input.value;
      ToggleUdescChange();
    } catch (e) {
      console.log("post desc crash");
      ToggleUdescChange();
    }
  }

  const none = () => {}

  return (
    <main>
      <div style={{height: '10px', width: '100%'}}></div> {/* cette ligne est fait pour cancel le probleme de top margin*/}
      
      <div className={style.Top}>
        <div className={style.ppborder}> 
          {/* POur la pp  */}
          <img className={style.pp} src={PpSrc} onClick={changePP}></img>
          <button className={style.changePp} onClick={changePP}>modif</button>
        </div>
        <div className={style.status} id='statusdiv' title='status: online'></div>
        <div className={style.TopMain}>
          {/* le Uid  */}
          <div className={style.topmainOne}>
              <div className={style.topmainOneTitle} title='your id'>User id : </div>
              <div className={style.topmainOneInfo_}>{Uid}</div>
          </div>
          {/* le username  */}
          <div className={style.topmainOne}>
            <div className={style.topmainOneTitle} title='your username'>Username : </div>
            <div className={style.topmainOneInfo} id='uname_' onClick={ToggleUnameChange}>{Uname}</div>
            <div className={style.topmainOneButtonBorder} id='uname_i'><input placeholder='username' type='text' id='uname_i_i' className={style.topmainOneInput}></input><div className={style.topmainOneButton} onClick={changeUsername}>SEND</div></div>
          </div>
          {/* le mail  */}
          <div className={style.topmainOne}>
              <div className={style.topmainOneTitle} title='your email'>Email : </div>
              <div className={style.topmainOneInfo_}>{Email}</div>
          </div>
          {/* is 42  */}
          <div className={style.topmainOne}>
            <div className={style.topmainOneTitle}>User is a 42 student : </div>
            <div className={style.topmainOneInfo_}><TfiClose id='is42NO'/><TfiCheck id='is42YES'/></div>
          </div>
          {/* la description  */}
          <div className={style.topmainOneDESC}>
            <div className={style.topmainOneTitle} title='your description'>Description : </div>
            <textarea className={style.topmainOneInfoDESC2} id='desc_' onClick={ToggleUdescChange} value={desc} onChange={none}></textarea>
            <div className={style.topmainOneButtonBorderDESC} id='desc_i'><textarea placeholder='your description' id='desc_i_i' className={style.topmainOneInputDESC} maxLength={150}></textarea><div className={style.topmainOneButtonDESC} onClick={changeDescription}>SEND</div></div>
          </div>
        </div>
      </div>
    </main>
  );
}
