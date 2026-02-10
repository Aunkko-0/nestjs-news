import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';


export const jwtSecret = process.env.JWT_SECRET;

@Module({
  imports: [
    PrismaModule,
    PassportModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'secret-for-dev-only',
        signOptions: { expiresIn: '1d' }, // อายุ Token 1 วัน
      }),
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService , JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}