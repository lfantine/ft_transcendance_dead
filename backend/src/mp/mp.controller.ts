import { Controller, Get, Param } from '@nestjs/common';
import { MpService } from './mp.service';

@Controller('message')
export class MpController {
	constructor(private readonly mpService: MpService) {}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.mpService.findById(id);
	}
}