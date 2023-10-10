import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios, { AxiosInstance } from 'axios';
import PostgresErrorCodes from 'src/database/postgresErrorCodes';
import { Request } from 'express';
// import crypto from 'crypto';

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

	async login42(token: string, refresh_token: string){
		const axiosInstance: AxiosInstance = axios.create({
			baseURL: 'https://api.intra.42.fr/v2',
		});
		try{
			const headers = {
				'Authorization': `Bearer ${token}`,
			};
			const { data } = await axiosInstance.get('/me', {headers});
			const { email, login } = data;

			try {
				const user = await this.userService.findByMail(email);
				user.token = token;
				user.refresh_token = refresh_token;
				return await this.userService.updateUser(user);
			} catch ( e ) {
				console.log('user not found go creating one');
			}
			const ImgData: Buffer = Buffer.alloc(0);
			const newUser = await this.userService.createUser({token, refresh_token, mail: email, Uid: login, username: login, level: 0, MMR: 0, pic: ImgData, desc: 'new user', history: '', nbGamePlayed: 0, victory: 0, is42: true, password: "none", socketId: 'none', status: -1, friends: [login], recent_contact: []});
			return newUser;
		} catch (error) {
			console.log('an error occure during 42 User creation');
			console.log('error is : ' + error);
		}
		
		return undefined;
	}

	async register(data: any) {
		if (data === undefined)
			throw new HttpException('Something went wrong !', HttpStatus.BAD_REQUEST);

		// possibiliter de valider l'email avant creation

		try {
 			
			const hashPassword = await this.createHash(data.password);

			const ImgData: Buffer = Buffer.alloc(0);
			const newUser = await this.userService.createUser({token : 'none', refresh_token: 'none', mail: data.email, Uid:data.username, username: data.username, level: 0, MMR: 0, pic: ImgData, desc: 'new user', history: '', nbGamePlayed: 0, victory: 0, is42: false, password: hashPassword, socketId: 'none', status: -1, friends: [data.username], recent_contact: []});
			return newUser;
		} catch (error) {
			if (error?.code === PostgresErrorCodes.UniqueViolation){
				throw new HttpException('Email or password already taken !', HttpStatus.CONFLICT);
			}
			console.log('an error occure during classic User creation');
			console.log('error is : ' + error);
		}
		throw new HttpException('Something went wrong with user creation !', HttpStatus.BAD_REQUEST);
	}

	async createHash(password) {

		let crypto = require('node:crypto');
		// const salt = crypto.randomBytes(16).toString('hex');
		const salt = '12';
		return crypto.createHash('sha256').update(password + salt).digest('hex');
		// return crypto.createHmac('sha256', salt).update(password).digest('hex');

	}

	async login (data: any, user : any) {
		if (data === undefined)
			throw new HttpException('Something went wrong !', HttpStatus.BAD_REQUEST);
		if (user === undefined)
			throw new HttpException('Something went wrong !', HttpStatus.BAD_REQUEST);
		const hashPassword = await this.createHash(data.password);
		return (hashPassword === user.password)
	}

	async validateUser (data: any) {
		console.log(data);

		if (data === undefined)
			throw new HttpException('Something went wrong !', HttpStatus.BAD_REQUEST);

		const user = await this.userService.findByUid(data.username);
		return user;
	}

	getCookieForLogout()
	{
		return 'Authentification=; HttpOnly; Path=/; Max-Age=0;';
	}

	async isLog (request : Request) {
		try {
			const user = await this.jwtService.verify(request?.cookies?.Authentification, this.configService.get('JWT_SECRET'));
			return true;
		} catch (error) {
			return false;
		}
	}
}
