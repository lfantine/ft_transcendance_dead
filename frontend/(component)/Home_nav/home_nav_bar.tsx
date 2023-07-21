'use client'

import style from './home_bar.module.css'
import Link from 'next/link'
import { routes } from '../../utils/route'
import { useRouter } from 'next/navigation';
import axios, { AxiosInstance } from 'axios';
import { AuthResponse } from '../other/utils';
import { useEffect } from 'react';

export interface INavbar {
	navActive: boolean;
}


const Hnav: React.FC<INavbar> = (Content) => {

	const { push } = useRouter();

	const handleConnect = () => {
		const url = process.env.CONNECT_URL;
		if (url)
			push(url);
		else
			console.log(url);
		push('https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-a90700412bf1d5b5899d47c748d233552ee6b8d8473407e8afdcb396067057fe&redirect_uri=https%3A%2F%2Flocalhost%2Fconnect&response_type=code');
	}

	const Test = async () => {
		console.log("test launch");
		try {
			const axiosI: AxiosInstance = axios.create({
				baseURL: '',
			});
			const rep = await axiosI.get('https://localhost/api/auth/isLogin',  { withCredentials: true});
			console.log(rep);
		} catch (e) {
			console.log("test error");
		}
	}

	useEffect(() => {
	const checkLog = async () => {
			try {
				console.log('test');
				const axiosI: AxiosInstance = axios.create({
					baseURL: '',
				});
				const rep = await axiosI.get('https://localhost/api/auth/isLogin',  { withCredentials: true});
				if (rep.data)
					push("/TEST")
			} catch (e) {
				console.log("test error");
			}
		};

	checkLog();
	}, [])

	return (
		<main>
			<div className={style.bar}>
				<div className={style.Hb} onClick={handleConnect}><h3 className={style.select}>PLAY</h3></div>
				<div className={style.Hb}><Link className={style.Link} href={routes.HOME_CREDIT}><h3 className={style.select}>Credit</h3></Link></div>
				<div className={style.Hb}><Link className={style.Link} href={routes.HOME_LOGIN}><h3 className={style.select}>Login</h3></Link></div>
				<div className={style.game_dev}>
					<Link className={style.Link} href={routes.GAME}> <h3 className={style.select}>Game dev</h3> </Link>
				</div>
				<div className={style.game_dev} onClick={Test}><h3 className={style.select}>narty dev</h3></div>
			</div>
		</main>
	);
}

export default Hnav;