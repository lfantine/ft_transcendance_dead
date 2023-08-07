import { Body, Controller, Post, Req, Get, Res, HttpStatus, UseGuards, HttpException } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ConfigService } from '@nestjs/config';
import { isAuthGuard } from './guard/isAuthGuard';
import { Response, Request } from 'express';
import RequestUser from './interface/RequestUser';
import getInfoNeed from './interface/getInfoNeed';

@Controller('dashboard')
export class DashboardController {

	constructor(
		private readonly dashService: DashboardService,
		private configService: ConfigService,
	) {}

	@Get('info')
	@UseGuards(isAuthGuard)
	async getInfo(@Res() response: Response, @Req() request: RequestUser) {
		const userID = request.UserId;
		try {
			if (userID === undefined)
				throw new HttpException('Something went wrong !', HttpStatus.BAD_REQUEST);
			const res: getInfoNeed = await this.dashService.getInfo(userID);
			if (res === undefined)
				throw new HttpException('Something went wrong !', HttpStatus.BAD_REQUEST);
			response.send({
				data: res,
				error: false
			});
			return res;
		} catch (e) {
			return ({
				data: 'none',
				error: true,
				ErrorInfo: 'error while searching user'
			});
		}
	}

	@Post('desc')
	@UseGuards(isAuthGuard)
	async postDesc(@Res() response: Response, @Req() request: RequestUser, @Body('desc') desc: string) {
		const userID = request.UserId;
		console.log('post desc is reached');
		try {
			console.log('desc = ' + desc);
			if (userID === undefined || desc === undefined)
				throw new HttpException('Something went wrong !', HttpStatus.BAD_REQUEST);
			const res = await this.dashService.postDesc(userID, desc);
			response.send({
				data: res,
				error: false
			});
			return res;
		} catch (e) {
			console.log('post desc crashed');
			response.send({
				data: 'none',
				error: true,
				ErrorInfo: 'error while searching user'
			});
			return 'error';
		}
	}

	@Post('username')
	@UseGuards(isAuthGuard)
	async postUsername(@Res() response: Response, @Req() request: RequestUser, @Body('username') username: string) {
		const userID = request.UserId;
		console.log('post desc is reached');
		try {
			console.log('desc = ' + username);
			if (userID === undefined || username === undefined)
				throw new HttpException('Something went wrong !', HttpStatus.BAD_REQUEST);
			const res = await this.dashService.postUsername(userID, username);
			response.send({
				data: res,
				error: false
			});
			return res;
		} catch (e) {
			console.log('post username crashed');
			response.send({
				data: 'none',
				error: true,
				ErrorInfo: 'error while searching user'
			});
			return 'error';
		}
	}
}
