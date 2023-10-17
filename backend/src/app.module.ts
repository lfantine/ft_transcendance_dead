import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './socket/socket.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MessageModule } from './message/message.module';
import { MpModule } from './mp/mp.module';
// import { gameGateway } from './game/game.gateway';

@Module({
  imports: [AuthModule, DatabaseModule, ConfigModule, UserModule, MpModule, MessageModule, SocketModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}