import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios, { AxiosInstance } from 'axios';

interface TokenPayload{
	id: string;
	username: string;
}

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	async getCookieJwtToken(user: any)
	{
		let payload: TokenPayload = {id: user.id, username: user.username};
		console.log(payload);
		const token = this.jwtService.sign(payload);
		return `Authentification=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')};`;
	}

	async login(token: string, refresh_token: string){
		// console.log('token : ' + token + ' and refresh_token is ' + refresh_token);
		const axiosInstance: AxiosInstance = axios.create({
			baseURL: 'https://api.intra.42.fr/v2',
		});
		try{
			const headers = {
				'Authorization': `Bearer ${token}`,
			};
			const { data } = await axiosInstance.get('/me', {headers});
			const { email, login } = data;
			// console.log('mail : ' + email + ' and login is ' + login);

			try {
				const user = await this.userService.findByMail(email);
				user.token = token;
				user.refresh_token = refresh_token;
				return await this.userService.updateUser(user);
			} catch ( e ) {
				console.log('user not found go creating one');
			}
			const ImgData: Buffer = Buffer.alloc(0);
			const newUser = await this.userService.createUser({token, refresh_token, mail: email, is42: true ,username: login, level: 0, MMR: 0, pic: ImgData, desc: 'new user'});
			return newUser;
		} catch (error) {
			console.log('an error occure during user42 creation');
			console.log('error is : ' + error);
		}
		
		return undefined;
	}
}
