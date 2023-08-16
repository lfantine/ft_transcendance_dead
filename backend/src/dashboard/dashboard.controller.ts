import { Body, Controller, Post, Req, Get, Res, HttpStatus, UseGuards, HttpException } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ConfigService } from '@nestjs/config';
import { isAuthGuard } from './guard/isAuthGuard';
import { Response, Request } from 'express';
import RequestUser from './interface/RequestUser';
import getInfoNeed from './interface/getInfoNeed';
import getMinInfoNeed from './interface/getMinInfoNeed';

@Controller('dashboard')
export class DashboardController {

	constructor(
		private readonly dashService: DashboardService,
		private readonly configService: ConfigService,
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

	@Get('minInfo')
	@UseGuards(isAuthGuard)
	async getMinInfo(@Res() response: Response, @Req() request: RequestUser) {
		const userID = request.UserId;
		try {
			if (userID === undefined)
				throw new HttpException('Something went wrong !', HttpStatus.BAD_REQUEST);
			const res: getMinInfoNeed = await this.dashService.getInfo(userID);
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
		try {
			if (userID === undefined || username === undefined)
				throw new HttpException('Something went wrong !', HttpStatus.BAD_REQUEST);
			const res = await this.dashService.postUsername(userID, username);
			response.send({
				data: res.username,
				error: false
			});
			// this.socketGateway.sendEditEvent(res.socketId);
			return res.username;
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

	@Post('pic')
	@UseGuards(isAuthGuard)
	async postPic(@Req() request: RequestUser, @Res() response: Response) {
		const userID = request.UserId;
		const { image } = request.body;
		console.log('post pp reached');
		try {
			if (userID === undefined || image === undefined || image === null)
				throw new HttpException('Something went wrong !', HttpStatus.BAD_REQUEST);
			const res = await this.dashService.postPic(Buffer.from(image, 'base64'), userID);
			console.log('posting pp ok');
			response.send({
				data: res.mess,
				error: false
			});
			return res.mess;
		} catch (e) {
			console.log('post pp crashed');
			response.send({
				data: 'none',
				error: true,
				ErrorInfo: 'error while searching user'
			});
			return 'error';
		}
	}

	@Post('searchUser')
	@UseGuards(isAuthGuard)
	async searchUser(@Req() request: RequestUser, @Res() response: Response) {
		const userID = request.UserId;
		const { pseudo } = request.body;
		try {
			if (userID === undefined)
				throw new HttpException('Something went wrong !', HttpStatus.BAD_REQUEST);
			const res: any = await this.dashService.searchUser(pseudo);
			response.send({
				data: res,
				error: false
			});
			return res;
		} catch (e) {
			console.log('post pp crashed');
			response.send({
				data: 'none',
				error: true,
				ErrorInfo: 'error while searching user'
			});
			return 'error';
		}
	}
}
