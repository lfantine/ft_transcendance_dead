import { Injectable, Req} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Response, Request } from 'express';
import { SocketGateway } from 'src/socket/socket.gateway';


@Injectable()
export class DashboardService {

	constructor(
		private userService: UserService,
		private configService: ConfigService,
		private jwtService: JwtService,
	) {}

	async isAuthVerif(@Req() request: Request) {
		try {
			const user = await this.jwtService.verify(request?.cookies?.Authentification, this.configService.get('JWT_SECRET'));
			return user.id;
		} catch (e) {
			return undefined;
		}
	}

	async getInfo(id: string) {
		const user = await this.userService.findById(id);
		return user;
	}

	async getInfoPseudo(id: string) {
		const user = await this.userService.findByUid(id);
		// ici enlever toutes les info personels
		return user;
	}

	async MajRecentUser(userName: string, meId: any) {
		const me = await this.userService.findById(meId);
		if (me.recent_contact.includes(userName)){
			const index = me.recent_contact.indexOf(userName);
			me.recent_contact.splice(index, 1);
		}
		me.recent_contact.push(userName);
		this.userService.updateUser(me);
	}

	async postDesc(id: string, desc: string) {
		const user = await this.userService.findById(id);
		user.desc = desc;
		await this.userService.updateUser(user);
		return desc;
	}

	async postUsername(id: string, username: string) {
		const user = await this.userService.findById(id);
		user.username = username;
		await this.userService.updateUser(user);
		return {
			"username" : username,
			"socketId" : user.socketId,
		};
	}

	async postPic(binaryImg: Buffer, id: string) {
		let user = await this.userService.findById(id);
		user.pic = binaryImg;
		await this.userService.updateUser(user);
		return {
			mess: 'picture upload',
			"socketId" : user.socketId,
		};
	}

	async searchUser(pseudo: string) {
		const userList = await this.userService.getUsersBySimilarPseudo(pseudo);
		return userList;
	}

	async minProfil(id: string) {
		const user = await this.userService.findById(id);
		return {
			"pic": user.pic,
			"username": user.username,
			"Uid": user.Uid,
			"desc": user.desc,
			"MMR": user.MMR,
			"level": user.level,
			"status": user.status,
		};
	}

	async addFriend(friend: string, me: string) {
		const meUser = await this.userService.findById(me);
		const fUser = await this.userService.findByUid(friend);
		meUser.friends.push(friend);
		await this.userService.updateUser(meUser);
	}

	async removeFriend(friend: string, me: string) {
		const meUser = await this.userService.findById(me);
		const fUser = await this.userService.findByUid(friend);
		if (meUser.friends.includes(friend)){
			const index = meUser.friends.indexOf(friend);
			meUser.friends.splice(index, 1);
			await this.userService.updateUser(meUser);
		}
	}

	async getRecentUser(id: any) {
		const User = await this.userService.findById(id);
		return User.recent_contact;
	}

	async getMyFriends(id: any) {
		const User = await this.userService.findById(id);
		return User.friends;
	}
}
