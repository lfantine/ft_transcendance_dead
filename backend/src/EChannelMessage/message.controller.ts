import { Controller, Get, Param } from '@nestjs/common';
import { ChannelMessageService } from './message.service';

@Controller('channelMessage')
export class ChannelMessageController {
	constructor(private readonly channelMessageService: ChannelMessageService) {}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.channelMessageService.findById(id);
	}
}