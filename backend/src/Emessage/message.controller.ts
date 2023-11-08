import { Controller, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.messageService.findById(id);
	}
}