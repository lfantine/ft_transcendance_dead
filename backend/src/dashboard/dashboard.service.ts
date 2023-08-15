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
}
