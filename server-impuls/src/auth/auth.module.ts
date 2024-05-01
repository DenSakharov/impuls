import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from '#/auth/auth.controller';
import { tSecuserModule } from '#/tSecuser/tSecuser.module';
import { tSecuserService } from '#/tSecuser/tSecuser.service';
import { tSecUserProviders } from '#/tSecuser/tSecuser.provider';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    tSecuserModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
  ],
  providers: [
    AuthService, 
    tSecuserService, 
    ...tSecUserProviders
  ],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
