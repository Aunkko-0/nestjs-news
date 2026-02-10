import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from './auth.module'; // เรียกตัวแปรจาก AuthModule
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService 
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, 
      secretOrKey: configService.get<string>('JWT_SECRET') || 'secret-for-dev-only',
    });
  }
  async validate(payload: { userId: number }) {
    const user = await this.prisma.user.findUnique({
        where: { id: payload.userId },
    });

    if (!user) {
        throw new UnauthorizedException('ไม่พบผู้ใช้งานนี้ในระบบ');
    }
    return user; // ข้อมูลนี้จะถูกผูกกับ req.user ใน controller
  }
}