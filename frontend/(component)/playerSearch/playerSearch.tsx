'use client'
import axios from 'axios';
import Loading2 from '../loading2/loading2';
import { sleep } from '../other/utils';
import style from './ps.module.css'
import { useEffect, useState } from 'react';

const PlayerSearch = ({ player, rd } : any) => {

	const src = '/noUser.jpg';
	const [playerSearched, setPlayerSearched] = useState('Nartyyy');
	const [psSrc, setPsSrc] = useState(src);

	useEffect(() => {
		if (typeof document === undefined) {return ;}
		const handleClick = (Uid: any) => {
			return () => {
			  console.log(Uid);
			  playerProfil(Uid);
			};
		};

		async function mep() {
			try {
				const panel = document.getElementById('profilPanel');
				if (!panel) {return ;}
				panel.innerHTML = '';
				const List = await axios.post('https://localhost/api/dashboard/searchUser',  {pseudo: player}, { withCredentials: true});
				const rep = List.data.data.list;
				console.log(rep);
				for (let i = 0; i < rep.length; i++) {
					if (rep[i].username === List.data.data.me)
						continue ;
					let profil = document.createElement('div');
					profil.classList.add(style.profil);

					let profilInfo = document.createElement('div');
					profilInfo.classList.add(style.profilInfo);
					profil.appendChild(profilInfo);

					let templine = document.createElement('div');
					templine.classList.add(style.templine);
					profilInfo.appendChild(templine);

					let imgpp = document.createElement('img');
					imgpp.classList.add(style.profilPp);
					if (rep[i].pic.data.length > 0) {
						const binImg = rep[i].pic;
						const binaryImg = new Uint8Array(binImg.data);
						let base64Img = '';
						binaryImg.forEach(byte => {
							base64Img += String.fromCharCode(byte); // Convertir chaque octet en caractère
						});
						const imageUrl = `data:image/jpeg;base64,${btoa(base64Img)}`;
					imgpp.src = imageUrl;
					}
					else 
					imgpp.src = src;
					templine.appendChild(imgpp);

					let profilName = document.createElement('div');
					profilName.classList.add(style.profilName);
					profilName.innerText = rep[i].Uid;
					profilName.id = rep[i].Uid;
					templine.appendChild(profilName);

					let profilStatus = document.createElement('div');
					profilStatus.classList.add(style.profilStatus);
					if (rep[i].status === -1) {
						profilStatus.classList.add(style.red);
						profilStatus.title= 'status: offline';
					}
					else if (rep[i].status === 2) {
						profilStatus.classList.add(style.blue);
						profilStatus.title= 'status: on menu';
					}
					else if (rep[i].status === 1) {
						profilStatus.title= 'status: online';
					}
					templine.appendChild(profilStatus);

					let profilLvl = document.createElement('div');
					profilLvl.classList.add(style.profilLvl);
					profilLvl.innerHTML = "Level : " + ((rep[i].level - (rep[i].level % 100)) / 100);
					templine.appendChild(profilLvl);

					let profilAddBut = document.createElement('button');
					profilAddBut.classList.add(style.profilAddBut);
					profilAddBut.innerText = 'ADD';
					templine.appendChild(profilAddBut);

					let profilInteract = document.createElement('div');
					profilInteract.classList.add(style.profilInteract);
					profil.appendChild(profilInteract);

					let profilBut = document.createElement('button') as HTMLButtonElement;
					profilBut.classList.add(style.profilBut);
					profilBut.innerText = 'see Profil';
					profilBut.addEventListener('click', handleClick(rep[i].Uid));
					profilInteract.appendChild(profilBut);

					let profilBut2 = document.createElement('button');
					profilBut2.classList.add(style.profilBut);
					profilBut2.innerText = 'Send Message';
					profilInteract.appendChild(profilBut2);

					panel.appendChild(profil);
				}
				console.log(rep);
				return ;
			} catch (e) {

			}
		};

		mep();
		const searchTab = document.getElementById('searchTab');
		const profilTab = document.getElementById('profilTab');
		if (!searchTab || !profilTab) {return ;}
		searchTab.classList.add(style.hidden);
		profilTab.classList.add(style.hidden);
		profilTab.classList.remove(style.hidden);
		console.log(rd);
		return ;
	}, [player]);

	const switchPanel = async (onProfil: boolean) => {
		const searchTab = document.getElementById('searchTab');
		const profilTab = document.getElementById('profilTab');
		if (!searchTab || !profilTab) {return ;}
		console.log(onProfil);
		if (onProfil) {
			searchTab.classList.remove(style.hidden);
			profilTab.classList.add(style.hidden);
		}
		else {
			searchTab.classList.add(style.hidden);
			profilTab.classList.remove(style.hidden);
		}
	}

	const playerProfil = async (player: string) => {
		setPlayerSearched(player);
		switchPanel(false);
	}

	return (
		<main className={style.main}>
			<div style={{width: '100%', height: '0px'}}></div>
			<div className={style.tab} id='searchTab'>
				<div className={style.profilPanel} id='profilPanel'>
					{/* Pour faire l'affichage des profil trouver */}
				</div>
			</div>
			<div className={style.tabProfil} id='profilTab'>
				<div className={style.Finfo}>
					<div className={style.UserSPpCadre}><img className={style.UserSPp} src={psSrc}></img></div>
					<div className={style.USInfoCadre}>
						<div className={style.info}><div className={style.Tinfo}>Display name</div>: <div className={style.Cinfo}>opoooooooooooooooooooooooooooooooooo</div></div>
						<div className={style.info}><div className={style.Tinfo}>Username</div>: <div className={style.Cinfo}>o</div></div>
						<div className={style.info}><div className={style.Tinfo}>Level</div>: <div className={style.Cinfo}>o</div></div>
						<div className={style.info}><div className={style.Tinfo}>o</div>: <div className={style.Cinfo}>o</div></div>
						<div className={style.info}><div className={style.Tinfo}>o</div>: <div className={style.Cinfo}>o</div></div>
						<div className={style.infoDesc}><textarea className={style.DescInfo} readOnly={true}>chapi chapo</textarea></div>
					</div>
				</div>
			</div>
		</main>
	);
}

// export async function getServerSideProps() {
// 	// Fetch data from an API or any other data source
// 	// none here
    
// 	return {
// 	  props: {
// 	  },
// 	};
// }

export default PlayerSearch;