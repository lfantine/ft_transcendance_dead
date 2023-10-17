import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Message from './Message.entity';
import { ILike, Repository } from 'typeorm';
import CreateMessageDto from './CreateMessage.dto';

@Injectable()
export class MessageService {
	constructor(@InjectRepository(Message) private messageRepository: Repository<Message>) {}

	async findById(id: string): Promise<Message>{
		const user = await this.messageRepository.findOneBy({id});
		if (user) {
			return user;
		}
		throw new HttpException('User with this id does not exist !', HttpStatus.NOT_FOUND);
	}

	async createMessage(messageData: CreateMessageDto) {
		const newMessage = await this.messageRepository.create(messageData);
		await this.messageRepository.save(newMessage);
		return newMessage;
	}

	async updateMessage(newMessage: Partial<Message>): Promise<Message>{
		try {
			const { id } = newMessage;
			const mess = await this.messageRepository.findOneBy({id});
			const updateMess = Object.assign(mess, newMessage);
			this.messageRepository.save(updateMess);
			return updateMess;
		} catch (e) {
			return undefined;
		}
	}

	async removemessage(id: number): Promise<void>{
		await this.messageRepository.delete(id);
	}
}