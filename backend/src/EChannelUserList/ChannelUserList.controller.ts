import { Controller, Get, Param } from '@nestjs/common';
import { ChannelULService } from './ChannelUserlist.service';

@Controller('ChannelUserList')
export class ChannelULController {
	constructor(private readonly ChannelULService: ChannelULService) {}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.ChannelULService.findById(id);
	}
}