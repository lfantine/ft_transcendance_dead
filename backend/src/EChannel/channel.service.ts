import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Channel from './Channel.entity';
import CreateChannelDto from './CreateChannel.dto';

@Injectable()
export class ChannelService {
	constructor(@InjectRepository(Channel) private channelRepository: Repository<Channel>) {}

	async findById(id: string): Promise<Channel>{
		const channel = await this.channelRepository.findOneBy({id});
		if (channel) {
			return channel;
		}
		throw new HttpException('mp with this id does not exist !', HttpStatus.NOT_FOUND);
	}

	async findByIdWithMps(id: string): Promise<Channel> {
		const channel = await this.channelRepository.findOne({ where: { id }, relations: ['messages'] });
		if (channel) {
		  return channel;
		}
		throw new HttpException('channel with this id does not exist!', HttpStatus.NOT_FOUND);
	}

	async createMp(mpData: CreateChannelDto) {
		const newChannel = await this.channelRepository.create(mpData);
		await this.channelRepository.save(newChannel);
		return newChannel;
	}

	async updateMp(newChannel: Partial<Channel>): Promise<Channel>{
		try {
			const { id } = newChannel;
			const mp = await this.channelRepository.findOneBy({id});
			const updateChannel = Object.assign(mp, newChannel);
			this.channelRepository.save(updateChannel);
			return updateChannel;
		} catch (e) {
			return undefined;
		}
	}

	async removeMp(id: number): Promise<void>{
		await this.channelRepository.delete(id);
	}
}