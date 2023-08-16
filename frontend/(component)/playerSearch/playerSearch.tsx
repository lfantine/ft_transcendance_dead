'use client'
import axios from 'axios';
import Loading2 from '../loading2/loading2';
import { sleep } from '../other/utils';
import style from './ps.module.css'
import { useEffect, useState } from 'react';

const PlayerSearch = ({ player } : any) => {

	const src = '/noUser.jpg';

	useEffect(() => {

		async function mep() {
			try {
				const panel = document.getElementById('profilPanel');
				if (!panel) {return ;}
				panel.innerHTML = '';
				const List = await axios.post('https://localhost/api/dashboard/searchUser',  {pseudo: player}, { withCredentials: true});
				const rep = List.data.data;
				for (let i = 0; i < rep.length; i++) {
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
					const binImg = rep[i].pic;
						const binaryImg = new Uint8Array(binImg.data);
						let base64Img = '';
						binaryImg.forEach(byte => {
							base64Img += String.fromCharCode(byte); // Convertir chaque octet en caractère
						});
						const imageUrl = `data:image/jpeg;base64,${btoa(base64Img)}`;
					imgpp.src = imageUrl;
					templine.appendChild(imgpp);

					let profilName = document.createElement('div');
					profilName.classList.add(style.profilName);
					profilName.innerText = rep[i].Uid;
					templine.appendChild(profilName);

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

					let profilBut = document.createElement('button');
					profilBut.classList.add(style.profilBut);
					profilBut.innerText = 'see Profil';
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
		return ;
	}, [player])

	return (
		<main className={style.main}>
			<div style={{width: '100%', height: '0px'}}></div>
			<div className={style.tab}>
				<div className={style.profilPanel} id='profilPanel'>
					{/* <div className={style.profil}>
						<div className={style.profilInfo}>
							<div className={style.templine}>
								<img className={style.profilPp} src={src}></img>
								<div className={style.profilName}>{player}</div>
								<div className={style.profilLvl}>Level : 0</div>
								<button className={style.profilAddBut}>ADD</button>
							</div>
						</div>
						<div className={style.profilInteract}>
							<button className={style.profilBut}>See Profil</button>
							<button className={style.profilBut}>Send message</button>
						</div>
					</div> */}
				</div>
			</div>
		</main>
	);
}
export default PlayerSearch;