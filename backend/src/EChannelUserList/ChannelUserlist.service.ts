import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ChannelUL from './ChannelUserList.entity';
import CreateChanelUserListDto from './CreateChannelUserList.dto';

@Injectable()
export class ChannelULService {
	constructor(@InjectRepository(ChannelUL) private ChannelULRepository: Repository<ChannelUL>) {}

	async findById(id: string): Promise<ChannelUL>{
		const ChannelUL = await this.ChannelULRepository.findOneBy({id});
		if (ChannelUL) {
			return ChannelUL;
		}
		throw new HttpException('ChannelUL with this id does not exist !', HttpStatus.NOT_FOUND);
	}

	async createChannelUL(CULData: CreateChanelUserListDto) {
		const newCUL = await this.ChannelULRepository.create(CULData);
		await this.ChannelULRepository.save(newCUL);
		return newCUL;
	}

	async updateCHannelUL(newChannelUL: Partial<ChannelUL>): Promise<ChannelUL>{
		try {
			const { id } = newChannelUL;
			const channelUL = await this.ChannelULRepository.findOneBy({id});
			const updateChannelUL = Object.assign(channelUL, newChannelUL);
			this.ChannelULRepository.save(updateChannelUL);
			return updateChannelUL;
		} catch (e) {
			return undefined;
		}
	}

	async removeMChannelUL(id: number): Promise<void>{
		await this.ChannelULRepository.delete(id);
	}
}