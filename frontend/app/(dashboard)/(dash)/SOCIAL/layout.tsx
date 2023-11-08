'use client'

import React, { useEffect, useState, createContext, useContext } from 'react';
import ReactDOMServer from "react-dom/server";
import { useRouter } from 'next/navigation';
import axios, { AxiosInstance } from 'axios';
import style from './menu.module.css';
import { useSocketContext } from '../layout';
import { routes } from '@/utils/route';
import { AiOutlineUser, AiFillMessage } from "react-icons/ai";
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from "react-icons/bs";
import { sleep } from '@/(component)/other/utils';


function createDOMElementWithIcon(iconComponent: any) {
  // Créez un conteneur div
  const container = document.createElement("div");

  // Rendez le composant React en HTML
  const iconHTML = ReactDOMServer.renderToStaticMarkup(iconComponent);

  // Ajoutez le HTML généré dans le conteneur div
  container.innerHTML = iconHTML;

  return container;
}

const waitingForData: any = null;
const ProfilContext = createContext(waitingForData);

export function useProfilContext() {
  return useContext(ProfilContext);
}

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode
}) {
	const { push } = useRouter();
  const [profil, setProfilSearched] = useState('none');
  const [formState, setFormState] = useState(0); // 0 = contact et 1 = channel
  const [page, setPage] = useState(0);
  const socket = useSocketContext();

  const MAJprofilSearched = (value: string) => {
    setProfilSearched(value);
  };

  const panelUserRecent = async () => {
    const axiosI: AxiosInstance = axios.create({
      baseURL: '',
    });
    const {data} = await axiosI.get('https://localhost/api/dashboard/getRecentUser', { withCredentials: true});
    // console.log(data);
    const zone = document.getElementById('user_content');
    if (zone) {zone.innerHTML = '';}
    for (let index = data.data.length-1; index >= 0; index--) {
      // console.log('user = ' + data.data[index]);
      const user_case = document.createElement('div');
      user_case.classList.add(style.user_case);

      const user_case_name = document.createElement('div');
      user_case_name.classList.add(style.user_case_name);
      user_case_name.innerText = data.data[index];
      user_case.appendChild(user_case_name);

      const user_case_button_section = document.createElement('div');
      user_case_button_section.classList.add(style.user_case_button_section);

      const user_case_icon1 = createDOMElementWithIcon(<AiOutlineUser className={style.user_case_icon}/>);
      user_case_icon1.classList.add(style.user_case_icon_box);
      user_case_icon1.addEventListener('click', goProfil(data.data[index]));
      user_case_button_section.appendChild(user_case_icon1);
      
      const user_case_icon2 = createDOMElementWithIcon(<AiFillMessage className={style.user_case_icon}/>);
      user_case_icon2.classList.add(style.user_case_icon_box);
      user_case_icon2.addEventListener('click', goMp(data.data[index]));
      user_case_button_section.appendChild(user_case_icon2);

      user_case.appendChild(user_case_button_section);


      zone?.appendChild(user_case);
    }

    return ;
  };

  const panelFriends = async () => {
    const axiosI: AxiosInstance = axios.create({
      baseURL: '',
    });
    const {data} = await axiosI.get('https://localhost/api/dashboard/myfriends', { withCredentials: true});
    console.log(data);
    const zone = document.getElementById('user_content');
    if (zone) {zone.innerHTML = '';}
    for (let index = data.data.length-1; index >= 0; index--) {
      // console.log('user = ' + data.data[index]);
      const user_case = document.createElement('div');
      user_case.classList.add(style.user_case);

      const user_case_name = document.createElement('div');
      user_case_name.classList.add(style.user_case_name);
      user_case_name.innerText = data.data[index];
      user_case.appendChild(user_case_name);

      const user_case_button_section = document.createElement('div');
      user_case_button_section.classList.add(style.user_case_button_section);

      const user_case_icon1 = createDOMElementWithIcon(<AiOutlineUser className={style.user_case_icon}/>);
      user_case_icon1.classList.add(style.user_case_icon_box);
      user_case_icon1.addEventListener('click', goProfil(data.data[index]));
      user_case_button_section.appendChild(user_case_icon1);
      
      const user_case_icon2 = createDOMElementWithIcon(<AiFillMessage className={style.user_case_icon}/>);
      user_case_icon2.classList.add(style.user_case_icon_box);
      user_case_icon2.addEventListener('click', goMp(data.data[index]));
      user_case_button_section.appendChild(user_case_icon2);

      user_case.appendChild(user_case_button_section);


      zone?.appendChild(user_case);
    }

    return ;
  };

  useEffect(() => {

    const ctc = document.getElementById('ctc');
    if (!ctc)
      return ;
    ctc.classList.add(style.selected);

    MepFormState(0);
    setPage(0);

    panelUserRecent();
  }, [])

  useEffect(() => {
    socketInit();
    return () => {
      if (socket !== undefined) {
        socket.off('recentMaj');
        socket.off('friendMaj');
      }
    }
  }, [formState, socket])

  const socketInit = async () => {
    if (socket !== undefined) {
      socket.on('recentMaj', () => {
        actionForSocket();
      });

      socket.on('friendMaj', () => {
        actionForSocket();
      });
      
    } else {
      console.log('socket is undefined');
    }
  }

  const actionForSocket = async () => {
    console.log('received : ' + formState);
    await sleep(50);
    if (formState === 0) {
      panelUserRecent();
    } else if (formState === 2) {
      panelFriends();
    }
  }

  const goComPage = () => {
    MAJprofilSearched('none');
    comPage();
  }

  const goContPage = () => {
    MAJprofilSearched('none');
    contactPage();
  }

  const contactPage = () => {
    const com = document.getElementById('com');
    const ctc = document.getElementById('ctc');
    if (!ctc || !com)
      return ;
    ctc.classList.add(style.selected);
    com.classList.remove(style.selected);
    setPage(0);
    push(routes.SOCIAL);
  }

  const comPage = () => {
    const com = document.getElementById('com');
    const ctc = document.getElementById('ctc');
    if (!ctc || !com)
      return ;
    com.classList.add(style.selected);
    ctc.classList.remove(style.selected);
    setPage(1);
    push(routes.COM);
  }

  const goProfil = (userName: string) => {
    return async () => {
      contactPage();
      setProfilSearched(userName);
    };

    // La fonction est full inverser et Me est l'amis et friend est me Mais tkt j'ai aussi inverser dans le backend et ca fonctionne
  };

  const goMp = (userName: string) => {
    return async () => {
      comPage();
      setProfilSearched(userName);
    };
  };

  const MepFormState = (state: number) => {
    setFormState(state);
    const ChanL = document.getElementById('ChanL');
    const Contact = document.getElementById('Contact');
    const Cchan = document.getElementById('createChannel');
    const Friend = document.getElementById('FriendL');
    if (!Contact || !ChanL || !Cchan || !Friend) {return ;}

    if (state === 0) {
      Friend.classList.add(style.hidden);
      ChanL.classList.remove(style.hidden);
      Contact.classList.remove(style.hidden);
      
      ChanL.classList.add(style.slideRight);
      Contact.classList.add(style.enterLeft);
      Cchan.classList.add(style.hidden);
    } else if (state === 1) {
      Friend.classList.remove(style.hidden);
      ChanL.classList.remove(style.hidden);
      Contact.classList.add(style.hidden);
      
      Friend.classList.add(style.slideRight);
      ChanL.classList.add(style.enterLeft);
      Cchan.classList.remove(style.hidden);
    } else if (state === 2) {
      Friend.classList.remove(style.hidden);
      ChanL.classList.add(style.hidden);
      Contact.classList.remove(style.hidden);
      
      Contact.classList.add(style.slideRight);
      Friend.classList.add(style.enterLeft);
      Cchan.classList.remove(style.hidden);
    }
  }

  const swipeRight = () => {
    let newState = formState;
    if (newState === 0) {newState = 2;}
    else if (newState === 1) {newState = 0;}
    else if (newState === 2) {newState = 1;}
    const ChanL = document.getElementById('ChanL');
    const Contact = document.getElementById('Contact');
    const Content = document.getElementById('user_content');
    const Cchan = document.getElementById('createChannel');
    const Friend = document.getElementById('FriendL');
    if (!Contact || !ChanL || !Content || !Cchan || !Friend) {return ;}

    Content.innerHTML = '';

    if (newState === 0) {
      Friend.classList.add(style.hidden);
      ChanL.classList.remove(style.hidden);
      Contact.classList.remove(style.hidden);

      ChanL.classList.remove(style.enterLeft);
      ChanL.classList.remove(style.enterRight);
      Contact.classList.remove(style.slideRight);
      Contact.classList.remove(style.slideLeft);

      ChanL.classList.add(style.slideRight);
      Contact.classList.add(style.enterLeft);

      Cchan.classList.add(style.hidden);

      panelUserRecent();
    } else if (newState === 1) {

      Friend.classList.remove(style.hidden);
      ChanL.classList.remove(style.hidden);
      Contact.classList.add(style.hidden);

      Friend.classList.remove(style.enterLeft);
      Friend.classList.remove(style.enterRight);
      ChanL.classList.remove(style.slideRight);
      ChanL.classList.remove(style.slideLeft);

      Friend.classList.add(style.slideRight);
      ChanL.classList.add(style.enterLeft);

      Cchan.classList.remove(style.hidden);
    } else if (newState === 2) {

      Friend.classList.remove(style.hidden);
      ChanL.classList.add(style.hidden);
      Contact.classList.remove(style.hidden);

      Contact.classList.remove(style.enterLeft);
      Contact.classList.remove(style.enterRight);
      Friend.classList.remove(style.slideRight);
      Friend.classList.remove(style.slideLeft);

      Contact.classList.add(style.slideRight);
      Friend.classList.add(style.enterLeft);

      Cchan.classList.add(style.hidden);

      panelFriends();
    }
    setFormState(newState);
  }

  const swipeLeft = () => {
    let newState = formState;
    if (newState === 0) {newState = 1;}
    else if (newState === 1) {newState = 2;}
    else if (newState === 2) {newState = 0;}
    const ChanL = document.getElementById('ChanL');
    const Contact = document.getElementById('Contact');
    const Content = document.getElementById('user_content');
    const Cchan = document.getElementById('createChannel');
    const Friend = document.getElementById('FriendL');
    if (!Contact || !ChanL || !Content || !Cchan || !Friend) {return ;}

    Content.innerHTML = '';

    if (newState === 0) {
      Friend.classList.remove(style.hidden);
      ChanL.classList.add(style.hidden);
      Contact.classList.remove(style.hidden);

      Friend.classList.remove(style.enterLeft);
      Friend.classList.remove(style.enterRight);
      Contact.classList.remove(style.slideRight);
      Contact.classList.remove(style.slideLeft);

      Friend.classList.add(style.slideLeft);
      Contact.classList.add(style.enterRight);

      Cchan.classList.add(style.hidden);

      panelUserRecent();
    } else if (newState === 1) {
      Friend.classList.add(style.hidden);
      ChanL.classList.remove(style.hidden);
      Contact.classList.remove(style.hidden);

      Contact.classList.remove(style.enterLeft);
      Contact.classList.remove(style.enterRight);
      ChanL.classList.remove(style.slideRight);
      ChanL.classList.remove(style.slideLeft);

      Contact.classList.add(style.slideLeft);
      ChanL.classList.add(style.enterRight);

      Cchan.classList.remove(style.hidden);
    } else if (newState === 2) {
      Friend.classList.remove(style.hidden);
      ChanL.classList.remove(style.hidden);
      Contact.classList.add(style.hidden);

      ChanL.classList.remove(style.enterLeft);
      ChanL.classList.remove(style.enterRight);
      Friend.classList.remove(style.slideRight);
      Friend.classList.remove(style.slideLeft);

      ChanL.classList.add(style.slideLeft);
      Friend.classList.add(style.enterRight);

      Cchan.classList.add(style.hidden);

      panelFriends();
    }
    setFormState(newState);
  }

  //####### Pour le formulaire de creation des channels #######

  const [open, setOpen] = useState(0);

  useEffect(() => {
    const panel = document.getElementById('ChannelCreatePanel');
    if (!panel) {return ;}
    if (open === 0) {panel.classList.add(style.hidden);}
    else if (open === 1) {panel.classList.remove(style.hidden);}
  }, [open])

  const [privacy, setPrivacy] = useState(0); // 0 = public / 1 = private

  useEffect(() => {
    const publicDiv = document.getElementById('publicDiv');
    const privateDiv = document.getElementById('privateDiv');
    const mdpDiv = document.getElementById('needMdp'); 
    const SepaDiv = document.getElementById('mdpSepa');
    if (!publicDiv || !privateDiv || !mdpDiv || !SepaDiv) {return ;}

    if (privacy === 0) { // public 
      publicDiv.classList.add(style.privacySelectorChoiceSelected);
      privateDiv.classList.add(style.privacySelectorChoice);
      mdpDiv.classList.add(style.hidden);
      SepaDiv.classList.add(style.hidden);
    } else if (privacy === 1) { //private
      publicDiv.classList.add(style.privacySelectorChoice);
      privateDiv.classList.add(style.privacySelectorChoiceSelected);
    }
    return () => {
      publicDiv.classList.remove(style.privacySelectorChoiceSelected);
      publicDiv.classList.remove(style.privacySelectorChoice);
      privateDiv.classList.remove(style.privacySelectorChoiceSelected);
      privateDiv.classList.remove(style.privacySelectorChoice);
      mdpDiv.classList.remove(style.hidden);
      SepaDiv.classList.remove(style.hidden);
    };
  }, [privacy]);

  return (
    <main className={style.main}>
      <div style={{flex: '0 0 110px'}}></div> {/* cette ligne est fait pour cancel le probleme de top margin*/}
      <div className={style.panel}>
        <div className={style.list}>
          <div className={style.selector}>
            <button className={style.selectable} onClick={goComPage} id='com'>Communication</button>
            <button className={style.selectable} onClick={goContPage} id='ctc'>Contact</button>
          </div>
          <div className={style.form}>
            <div className={style.formTitle}>
              <div className={style.formTitleNext} onClick={swipeRight}><BsFillArrowLeftSquareFill className={style.formTitleNextIcon} /></div>
              <div className={style.formTitleSelect}>
                <div className={style.formTitleSelectOption} id='Contact'>Contact</div>
                <div className={style.formTitleSelectOption} id='ChanL'>Channel</div>
                <div className={style.formTitleSelectOption} id='FriendL'>Friends</div>
              </div>
              <div className={style.formTitleNext} onClick={swipeLeft}><BsFillArrowRightSquareFill className={style.formTitleNextIcon} /></div>
            </div>
            <div className={style.formContent} id='user_content'>
              
            </div>
            <div className={style.createChannelPanel} id='ChannelCreatePanel'>
              <h3 className={style.createChannelPanelTitle}>Create a new channel</h3>
              <div className={style.createChannelPanelBox}>
                <h4 className={style.createChannelPanelBoxTitle}>Name of the channel</h4>
                <input placeholder='enter the channel name' className={style.ChannelCreateInputName} maxLength={25} type='text' title="Only alphanumérics allowed." required></input>
              </div>
              <div className={style.separatorCreateChannel}></div>
              <div className={style.createChannelPanelBox}>
                <h4 className={style.createChannelPanelBoxTitle}>Privacy of the channel</h4>
                <div className={style.privacySelector}>
                  <div id='publicDiv' onClick={() => setPrivacy(0)}>Public</div>
                  <div id='privateDiv' onClick={() => setPrivacy(1)}>Private</div>
                </div>
              </div>
              <div className={style.separatorCreateChannel}></div>
              <div className={style.createChannelPanelBox} id='needMdp'>
                <h4 className={style.createChannelPanelBoxTitle}>Password please :</h4>
                <input type='text' className={style.createChannelPanelBoxInputPassword} placeholder='This is a bad password' maxLength={25} pattern="[A-Za-z0-9]+" title="Only alphanumérics allowed." required></input>
              </div>
              <div className={style.separatorCreateChannel} id='mdpSepa'></div>
              <div className={style.createChannelPanelBox}>
                <h4 className={style.createChannelPanelBoxTitle}>How many place in the channel ?</h4>
                <input type='number' className={style.createChannelPanelBoxInputPlace} placeholder='10' min={2} max={20} required></input>
              </div>
              <div className={style.separatorCreateChannel}></div>
              <div className={style.createChannelPanelBox}>
                <div className={style.createChannelPanelBoxButtonBox}>
                  <button className={style.createChannelButton} onClick={() => setOpen(0)}>Back</button>
                  <button className={style.createChannelButton}>Continue</button>
                </div>
              </div>
            </div>
            <div className={style.addNewChannel} id='createChannel'>
              <div className={style.addNewChannelTitle} onClick={() => setOpen(1)}>Create channel</div>
            </div>
          </div>
        </div>
        <div className={style.content}>
          <ProfilContext.Provider value={{profil, MAJprofilSearched, page}}>
            {children}
          </ProfilContext.Provider>
        </div>
      </div>
    </main>
  );
}
