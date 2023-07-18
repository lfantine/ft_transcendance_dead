import { Body, Controller, Post, Req, Get, Res } from '@nestjs/common';
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
	constructor(private readonly authService: AuthService, private configService: ConfigService) {}

	@Post('login')
	async login(@Body('code') code: string, @Res() response: Response, @Req() request: Request){
		console.log("test is res");
		try {
			const axiosI: AxiosInstance = axios.create({
				baseURL: '',
			});
			const reponse = await axiosI.post<oauthResponse>('https://api.intra.42.fr/oauth/token', {
				grant_type: 'authorization_code',
				client_id: this.configService.get('42_CLIENT_ID'),
				client_secret: this.configService.get('42_CLIENT_SECRET'),
				code: code,
				redirect_uri: 'http://localhost:3000/oauth',
			});
			const data = await this.authService.login(reponse.data.access_token, reponse.data.refresh_token);
			const cookie = await this.authService.getCookieJwtToken(data);
			request.body = data.username;
			request.res.setHeader('Set-Cookie', cookie);
			return response.send(request.body);
		} catch (e) {
			return response.send(undefined);
		}
	}

	@Get('testing')
	async testing() {
		console.log("received");
	}
}
