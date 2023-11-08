import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Mp from './Mp.entity';
import { Repository } from 'typeorm';
import CreateMpDto from './CreateMp.dto';

@Injectable()
export class MpService {
	constructor(@InjectRepository(Mp) private mpRepository: Repository<Mp>) {}

	async findById(id: string): Promise<Mp>{
		const mp = await this.mpRepository.findOneBy({id});
		if (mp) {
			return mp;
		}
		throw new HttpException('mp with this id does not exist !', HttpStatus.NOT_FOUND);
	}

	async findByIdWithMps(id: string): Promise<Mp> {
		const mp = await this.mpRepository.findOne({ where: { id }, relations: ['messages'] });
		if (mp) {
		  return mp;
		}
		throw new HttpException('mp with this id does not exist!', HttpStatus.NOT_FOUND);
	}

	async createMp(mpData: CreateMpDto) {
		const newMp = await this.mpRepository.create(mpData);
		await this.mpRepository.save(newMp);
		return newMp;
	}

	async updateMp(newMp: Partial<Mp>): Promise<Mp>{
		try {
			const { id } = newMp;
			const mp = await this.mpRepository.findOneBy({id});
			const updateMp = Object.assign(mp, newMp);
			this.mpRepository.save(updateMp);
			return updateMp;
		} catch (e) {
			return undefined;
		}
	}

	async removeMp(id: number): Promise<void>{
		await this.mpRepository.delete(id);
	}
}