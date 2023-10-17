import { Injectable, Req} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Response, Request } from 'express';
import { SocketGateway } from 'src/socket/socket.gateway';
import { MessageService } from 'src/message/message.service';
import { MpService } from 'src/mp/mp.service';
import { player_spoken } from 'src/interface/mp_speak/player_spoken';


@Injectable()
export class DashboardService {

	constructor(
		private userService: UserService,
		private messageService: MessageService,
		private mpService: MpService,
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

	async checkConversationExist(DestUid: string, MyId: string) {
		const Me = await this.userService.findByIdWithMps(MyId);
		console.log(Me.MPs);
		const mp_ = Me.MPs.find((mps) => mps.dest === DestUid);
		return {
			mp: mp_,
			me: Me.Uid,
		};
	}

	async GoConversation(DestUid: string, MyId: string) {
		try {
			const {mp, me} = await this.checkConversationExist(DestUid, MyId);
			if (mp !== undefined) {
				const theMp = await this.mpService.findByIdWithMps(mp.id);
				return {
					mess: theMp.messages,
					you: me,
				};
			} else {
				const Me = await this.userService.findByIdWithMps(MyId);
				const Dest = await this.userService.findByUidWithMps(DestUid);
				
				const MyMp = await this.mpService.createMp({dest: DestUid, user_attach: Me});
				const DestMp = await this.mpService.createMp({dest: Me.Uid, user_attach: Dest});
				
				const MeFirstMess = await this.messageService.createMessage({author: 'none', text: '12-10-2023', isDate: true, mp: MyMp});
				const DestFirstMess = await this.messageService.createMessage({author: 'none', text: '12-10-2023', isDate: true, mp: DestMp});
				
				if (MyMp.messages === undefined) {
					MyMp.messages = [];
				}
				if (DestMp.messages === undefined) {
					DestMp.messages = [];
				}
				MyMp.messages.push(MeFirstMess);
				DestMp.messages.push(DestFirstMess);
				
				await this.mpService.updateMp(MyMp);
				await this.mpService.updateMp(DestMp);
				
				if (Me.MPs === undefined) {
					Me.MPs = [];
				}
				if (Dest.MPs === undefined) {
					Dest.MPs = [];
				}
				Me.MPs.push(MyMp);
				Dest.MPs.push(DestMp);
				
				await this.userService.updateUser(Me);
				await this.userService.updateUser(Dest);
				
				return {
					mess: MyMp.messages,
					you: Me.Uid,
				};
			}
		} catch (e) {
			console.log('EXCEPTION');
			console.log(e);
			console.log('--------------------');
			return undefined;
		}
	}

	async sendMess(DestUid: string, MyId: string, mess: string) {
		const Me = await this.userService.findByIdWithMps(MyId);
		const Dest = await this.userService.findByUidWithMps(DestUid);
		
		const MeMp_ = Me.MPs.find((mps) => mps.dest === Dest.Uid);
		const DestMp_ = Dest.MPs.find((mps) => mps.dest === Me.Uid);

		const MeMp = await this.mpService.findByIdWithMps(MeMp_.id);
		const DestMp = await this.mpService.findByIdWithMps(DestMp_.id);
		
		const MyMess = await this.messageService.createMessage({author: Me.Uid, text: mess, isDate: false, mp: MeMp});
		const DestMess = await this.messageService.createMessage({author: Me.Uid, text: mess, isDate: false, mp: DestMp});
		
		MeMp.messages.push(MyMess);
		DestMp.messages.push(DestMess);
		
		await this.mpService.updateMp(MeMp);
		if (Me.blocked.includes(Me.Uid)) {}
		else{
			await this.mpService.updateMp(DestMp);
		}
		
		return true;
	}
}
