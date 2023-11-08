import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Mp from './Mp.entity';
import { MpService } from './mp.service';
import { MpController } from './mp.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mp])],
  providers: [MpService],
  controllers: [MpController],
  exports: [MpService]
})
export class MpModule {}