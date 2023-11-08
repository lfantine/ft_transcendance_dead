import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ChannelUL from './ChannelUserList.entity';
import { ChannelULService } from './ChannelUserlist.service';
import { ChannelULController } from './ChannelUserList.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelUL])],
  providers: [ChannelULService],
  controllers: [ChannelULController],
  exports: [ChannelULService]
})
export class MpModule {}