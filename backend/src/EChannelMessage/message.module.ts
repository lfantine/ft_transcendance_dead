import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelMessageService } from './message.service';
import { ChannelMessageController } from './message.controller';
import ChannelMessage from './Message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelMessage])],
  providers: [ChannelMessageService],
  controllers: [ChannelMessageController],
  exports: [ChannelMessageService]
})
export class MessageModule {}