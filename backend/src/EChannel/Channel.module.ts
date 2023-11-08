import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Channel from './Channel.entity';
import { ChannelController } from './Channel.controller';
import { ChannelService } from './channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  providers: [ChannelService],
  controllers: [ChannelController],
  exports: [ChannelService]
})
export class MpModule {}