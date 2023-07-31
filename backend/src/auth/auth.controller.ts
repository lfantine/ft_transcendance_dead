import { Body, Controller, Post, Req, Get, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { Request, Response } from 'express';

export type oauthResponse = {
	access_token: any;
	refresh_token: any;
	code: any;
};

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private configService: ConfigService,
		) {}

	@Post('login42')
	async login42(@Body('code') code: string, @Res() response: Response, @Req() request: Request){
		try {
			const axiosI: AxiosInstance = axios.create({
				baseURL: '',
			});
			const reponse = await axiosI.post<oauthResponse>('https://api.intra.42.fr/oauth/token', {
				grant_type: 'authorization_code',
				client_id: this.configService.get('42_CLIENT_ID'),
				client_secret: this.configService.get('42_CLIENT_SECRET'),
				code: code,
				redirect_uri: 'https://localhost/connect',
			});
			const data = await this.authService.login42(reponse.data.access_token, reponse.data.refresh_token);
			const cookie = await this.authService.getCookieJwtToken(data);
			request.body = data.username;
			request.res.setHeader('Set-Cookie', cookie);
			return response.send(request.body);
		} catch (e) {
			return response.send({data: 'error', error: true, errorCode: '1'});
		}
	}

	@Post('register')
	async register(@Res() response: Response, @Req() request: Request, @Body('data') data: any) {
		try {
			const res = await this.authService.register(data);
			return response.send({data: 'you are now register', error: false, errorCode: 'none'});
		} catch (e) {
			return response.send({data: e.data, error: true, errorCode: '-1'});
		}
	}

	@Post('login')
	async login (@Res() response: Response, @Req() request: Request, @Body('data') data: any) {
		
		let user;
		try {
			user = await this.authService.validateUser(data);
		} catch (e) {
			return response.send({data: 'user not found', error: true, errorCode: '1'});
		}

		try {
			const res = await this.authService.login(data, user);
			if (res) {
				const cookie = await this.authService.getCookieJwtToken(user);
				response.setHeader('Set-Cookie', cookie);
				return response.send({data: 'you are now login', error: false, errorCode: 'none'});
			}
			else
			{
				return response.send({data: 'bad password !', error: true, errorCode: '2'});
			}
		} catch (e) {
			return response.send({data: 'something went wrong !', error: true, errorCode: '-1'});
		}
	}

	@Post('logout')
	async logout(@Res() response: Response){
		response.setHeader('Set-Cookie', this.authService.getCookieForLogout());
		response.send();
	}

	@Get('isLogin')
	async isLogin(@Req() request: Request, @Res() response: Response){
		if (await this.authService.isLog(request) === true){
			return response.send(true);
		}
		return response.send(false);
	}
}