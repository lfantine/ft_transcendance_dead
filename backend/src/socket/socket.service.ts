import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Server } from 'socket.io';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SocketService {
	constructor(
		private userService: UserService,
		private configService: ConfigService,
		private jwtService: JwtService,
	) {}

	async linkSocket(socketId: string, cookie: any) {
		try {
			const userCookie = await this.jwtService.verify(cookie, this.configService.get('JWT_SECRET'));
			const user = await this.userService.findById(userCookie.id);
			user.socketId = socketId;
			user.status = 1;
			await this.userService.updateUser(user);
			return {error: false, username: user.username};
		} catch (error) {
			return {error: true};
		}
	}

	async unlinkSocket(socketID: string) {
		try {
			const user = await this.userService.findBySocketId(socketID);
			user.socketId = 'none';
			user.status = -1;
			await this.userService.updateUser(user);
			return {error: false, username: user.username};
		} catch (e) {
			return {error: true};
		}
	}
}
