import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { gameGateway } from './game/game.gateway';

@Module({
  imports: [AuthModule, DatabaseModule, ConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService, gameGateway],
})
export class AppModule {}