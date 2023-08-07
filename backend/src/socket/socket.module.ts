import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SocketService } from './socket.service';

@Module({
  imports: [UserModule, ConfigModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
      }
    }),
  })],
  providers: [SocketGateway, SocketService]
})
export class SocketModule {}
