import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Server } from 'socket.io';
import { UserService } from 'src/Euser/user.service';

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

	async getSocketIdFromUid(Uid: string) {
		try {
			const { socketId } = await this.userService.findByUid(Uid);
			return socketId;
		} catch (e) {
			return undefined;
		}
	}

	async MajRecentUser(userName: string, meUid: any) {
		const me = await this.userService.findByUid(meUid);
		if (me.recent_contact.includes(userName)){
			const index = me.recent_contact.indexOf(userName);
			me.recent_contact.splice(index, 1);
		}
		me.recent_contact.push(userName);
		this.userService.updateUser(me);
	}
}
