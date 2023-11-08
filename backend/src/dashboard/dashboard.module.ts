import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { UserModule } from 'src/Euser/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MessageModule } from 'src/Emessage/message.module';
import { MpModule } from 'src/Emp/mp.module';

@Module({
  imports: [UserModule, MessageModule, MpModule, ConfigModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
      }
    }),
  })],
  controllers: [DashboardController],
  providers: [DashboardService, ConfigService]
})
export class DashboardModule {}
