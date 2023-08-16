'use client'
import Loading2 from '../loading2/loading2';
import { sleep } from '../other/utils';
import style from './ps.module.css'
import { useEffect, useState } from 'react';

const PlayerSearch = ({ player } : any) => {

	const src = '/noUser.jpg';

	useEffect(() => {

		async function mep() {
			const t = document.getElementById('t');
			const t2 = document.getElementById('t2');
			if (!t || !t2)
				return ;
			t.classList.add(style.hidden);
			t2.classList.remove(style.hidden);
			await sleep(500);
			t.classList.remove(style.hidden);
			t2.classList.add(style.hidden);
		};

		mep();
		return ;
	})

	return (
		<main className={style.main}>
			<div style={{width: '100%', height: '0px'}}></div>
			<div className={style.tab}>
				<div className={style.profilPanel}>
					<div className={style.profil}>
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
					</div>
				</div>
			</div>
		</main>
	);
}
export default PlayerSearch;