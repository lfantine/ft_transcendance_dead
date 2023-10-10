'use client'
import axios, { AxiosInstance } from 'axios';
import Loading2 from '../loading2/loading2';
import { sleep } from '../other/utils';
import style from './ps.module.css'
import { useEffect, useState } from 'react';

const PlayerSearch = ({ player, rd } : any) => {

	const src = '/noUser.jpg';
	const [playerSearched, setPlayerSearched] = useState('Nartyyy');
	const [meName, setMe] = useState('');
	const [psSrc, setPsSrc] = useState(src);

	useEffect(() => {
		if (typeof document === undefined) {return ;}
		const handleClick = (Uid: any) => {
			return () => {
			  console.log(Uid);
			  playerProfil(Uid);
			};
		};

		const AddFriend = (Friend: string, Me: string) => {
			return async () => {
				const {data} = await axios.post('https://localhost/api/dashboard/addFriend',  {friend: Friend, me: Me}, { withCredentials: true});
				if (data.error === false) {
					console.log('successfully add ' + Friend + ' to your friend');
					const addBut = document.getElementById(Friend + 'AddF');
					addBut?.remove();
				} else {
					console.log('failed to add ' + Friend + ' to your friend');
				}
			};

			// La fonction est full inverser et Me est l'amis et friend est me Mais tkt j'ai aussi inverser dans le backend et ca fonctionne
		};

		async function mep() {
			try {
				const panel = document.getElementById('profilPanel');
				if (!panel) {return ;}
				panel.innerHTML = '';
				const List = await axios.post('https://localhost/api/dashboard/searchUser',  {pseudo: player}, { withCredentials: true});
				const rep = List.data.data.list;
				console.log(List.data.data);
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

					const friendList = List.data.data.myFriends;
					setMe(List.data.data.me);
					console.log('I set me here + ' + player);
					if (!friendList.includes(rep[i].Uid)){
						let profilAddBut = document.createElement('button');
						profilAddBut.classList.add(style.profilAddBut);
						profilAddBut.innerText = 'ADD';
						profilAddBut.id = rep[i].Uid + 'AddF';
						profilAddBut.addEventListener('click', AddFriend(rep[i].Uid, List.data.data.me));
						templine.appendChild(profilAddBut);
					}
					console.log('pass');

					let profilInteract = document.createElement('div');
					profilInteract.classList.add(style.profilInteract);
					profil.appendChild(profilInteract);

					let profilBut = document.createElement('button') as HTMLButtonElement;
					profilBut.classList.add(style.profilBut);
					profilBut.innerText = 'see Profil';
					profilBut.addEventListener('click', handleClick(rep[i].username));
					profilInteract.appendChild(profilBut);

					let profilBut2 = document.createElement('button');
					profilBut2.classList.add(style.profilBut);
					profilBut2.innerText = 'Send Message';
					profilInteract.appendChild(profilBut2);

					panel.appendChild(profil);
				}
				return ;
			} catch (e) {

			}
		};

		const searchTab = document.getElementById('searchTab');
		const profilTab = document.getElementById('profilTab');
		if (!searchTab || !profilTab) {return ;}
		mep();
		switchPanel(true);
		const isF = document.getElementById('isFriend');
		const isNF = document.getElementById('isNotFriend');
		if (!isF || !isNF) {return ;}
		isF.classList.remove(style.hidden);
		isNF.classList.remove(style.hidden);
		if (rd > 100)
			playerProfil(player);
		console.log(rd);
		return ;
	}, [player, rd]);

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

	const AFriend = async () => {
			const {data} = await axios.post('https://localhost/api/dashboard/addFriend',  {friend: playerSearched}, { withCredentials: true});
			if (data.error === false) {
				console.log('successfully add ' + playerSearched + ' to your friend');
				const addBut = document.getElementById('isFriend');
				addBut?.classList.add(style.hidden);
				const rBut = document.getElementById('isNotFriend');
				rBut?.classList.remove(style.hidden);
			} else {
				console.log('failed to add ' + playerSearched + ' to your friend');
			}
	};

	const RFriend = async () => {
		const {data} = await axios.post('https://localhost/api/dashboard/removeFriend',  {friend: playerSearched, me: meName}, { withCredentials: true});
		if (data.error === false) {
			console.log('successfully remove ' + playerSearched + ' to your friend');
			const addBut = document.getElementById('isFriend');
			addBut?.classList.remove(style.hidden);
			const rBut = document.getElementById('isNotFriend');
			rBut?.classList.add(style.hidden);
		} else {
			console.log('failed to remove ' + playerSearched + ' to your friend');
		}
};

	const playerProfil = async (player: string) => {
		try {
			const axiosI: AxiosInstance = axios.create({
				baseURL: '',
			});
			const {data} = await axiosI.post('https://localhost/api/dashboard/getUser',  {pseudo: player}, { withCredentials: true});
			if (data.error === true) {
				console.log("getInfo error");
			} else {
				console.log(data);
				setPlayerSearched(data.data.Uid);
				const uUsername = document.getElementById('Uusername');
				if (uUsername)
					uUsername.innerText =  data.data.username;
				if (data.data.pic.data.length > 0) {
					const binImg = data.data.pic;
					const binaryImg = new Uint8Array(binImg.data);
					let base64Img = '';
					binaryImg.forEach(byte => {
						base64Img += String.fromCharCode(byte); // Convertir chaque octet en caractère
					});
					const imageUrl = `data:image/jpeg;base64,${btoa(base64Img)}`;
					setPsSrc( imageUrl );
				}
				else 
					setPsSrc( src );
				const lvl = document.getElementById('lvl');
				if (lvl)
					lvl.innerText =  '' + ((data.data.level - (data.data.level % 100)) / 100);
				const dc = document.getElementById('desc') as HTMLTextAreaElement;
				if (dc)
					dc.value =  data.data.desc;
				const Game = document.getElementById('Game');
				if (Game)
					Game.innerText =  '' + data.data.nbGamePlayed;
				const win = document.getElementById('win');
				if (win)
					win.innerText =  '' + data.data.victory;
				const res = await axiosI.get('https://localhost/api/dashboard/myfriends', { withCredentials: true});
				console.log("TEST 2 + " + meName);
				const isF = document.getElementById('isFriend');
				const isNotF = document.getElementById('isNotFriend');
				if (!isF || !isNotF) {return ;}
				isF.classList.remove(style.hidden);
				isNotF.classList.remove(style.hidden);
				console.log(res);
				if (isF) {
					if (res.data.data.includes(data.data.Uid)) {
						isF.classList.add(style.hidden);
					} else {
					}
				}
				if (isNotF) {
					if (res.data.data.includes(data.data.Uid)) {
					} else {
						isNotF.classList.add(style.hidden);
					}
				}
			}
		} catch (e) {
			console.log("getInfo crash");
		}
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
						<div className={style.info}><div className={style.Tinfo}>Display name</div>: <div className={style.Cinfo} id='Uusername'></div></div>
						<div className={style.info}><div className={style.Tinfo}>Username</div>: <div className={style.Cinfo}>{playerSearched}</div></div>
						<div className={style.info}><div className={style.Tinfo}>Level</div>: <div className={style.Cinfo} id='lvl'>o</div></div>
						<div className={style.info}><div className={style.Tinfo}>Game played</div>: <div className={style.Cinfo} id='Game'>o</div></div>
						<div className={style.info}><div className={style.Tinfo}>Victory</div>: <div className={style.Cinfo} id='win'>o</div></div>
						<div className={style.infoDesc}><textarea className={style.DescInfo} readOnly={true} id='desc' value='cahpi chapo'></textarea></div>
					</div>
				</div>
				<button className={style.isFriend} id='isFriend' onClick={AFriend}>Add Friend</button><button className={style.isNotFriend} id='isNotFriend' onClick={RFriend}>Remove from Friend</button>
				<div className={style.USInfoCadre2}>
					<div className={style.info}><div className={style.Tinfo}>other</div>: <div className={style.Cinfo}>info is here ...</div></div>
					<div className={style.info}><div className={style.Tinfo}>other</div>: <div className={style.Cinfo}>info is here ...</div></div>
					<div className={style.info}><div className={style.Tinfo}>other</div>: <div className={style.Cinfo}>info is here ...</div></div>
					<div className={style.info}><div className={style.Tinfo}>other</div>: <div className={style.Cinfo}>info is here ...</div></div>
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