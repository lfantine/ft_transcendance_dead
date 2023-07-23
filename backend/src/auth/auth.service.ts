import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios, { AxiosInstance } from 'axios';
// import * as bcrypt from 'bcrypt';
import PostgresErrorCodes from 'src/database/postgresErrorCodes';
import { Request } from 'express';

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
			const newUser = await this.userService.createUser({token, refresh_token, mail: email, username: login, level: 0, MMR: 0, pic: ImgData, desc: 'new user', is42: true, password: "none"});
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

		console.log('------------');
		console.log(data);
		console.log('------------');

		try {
			// const hashPassword = await bcrypt.hash(data.password, 10);
			const hashPassword = data.password;
			// ---------
			console.log('HashedPassword = ' + hashPassword);
			const ImgData: Buffer = Buffer.alloc(0);
			const newUser = await this.userService.createUser({token : 'none', refresh_token: 'none', mail: data.email, username: data.username, level: 0, MMR: 0, pic: ImgData, desc: 'new user', is42: false, password: hashPassword});
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

	async login (data: any, user : any) {
		console.log("---------------");
		console.log("password = ");
		console.log(data.password);
		console.log("hash = ");
		console.log(user.hashPassword);
		console.log("---------------");
		if (data === undefined)
			throw new HttpException('Something went wrong !', HttpStatus.BAD_REQUEST);
		if (user === undefined)
			throw new HttpException('Something went wrong !', HttpStatus.BAD_REQUEST);

		console.log("securiter pass");
		// const passMatch = await bcrypt.compare(data.password, user.password);
		const passMatch = true;
		// -------
		console.log("---------------");
		return passMatch;
		
	}

	async validateUser (data: any) {
		console.log(data);

		if (data === undefined)
			throw new HttpException('Something went wrong !', HttpStatus.BAD_REQUEST);

		const user = await this.userService.findByUsername(data.username);
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
