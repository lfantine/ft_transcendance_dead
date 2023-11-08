import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import ChannelMessage from './Message.entity';
import CreateChannelMessageDto from './CreateMessage.dto';

@Injectable()
export class ChannelMessageService {
	constructor(@InjectRepository(ChannelMessage) private channelMessageRepository: Repository<ChannelMessage>) {}

	async findById(id: string): Promise<ChannelMessage>{
		const user = await this.channelMessageRepository.findOneBy({id});
		if (user) {
			return user;
		}
		throw new HttpException('User with this id does not exist !', HttpStatus.NOT_FOUND);
	}

	async createMessage(messageData: CreateChannelMessageDto) {
		const newMessage = await this.channelMessageRepository.create(messageData);
		await this.channelMessageRepository.save(newMessage);
		return newMessage;
	}

	async updateMessage(newMessage: Partial<ChannelMessage>): Promise<ChannelMessage>{
		try {
			const { id } = newMessage;
			const mess = await this.channelMessageRepository.findOneBy({id});
			const updateMess = Object.assign(mess, newMessage);
			this.channelMessageRepository.save(updateMess);
			return updateMess;
		} catch (e) {
			return undefined;
		}
	}

	async removemessage(id: number): Promise<void>{
		await this.channelMessageRepository.delete(id);
	}
}