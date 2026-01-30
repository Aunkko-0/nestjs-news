import { Injectable, NotFoundException, UnauthorizedException, ConflictException  } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { register } from 'module';
import { MESSAGES } from '@nestjs/core/constants';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const roundsOfHashing = 10;

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService , private jwtService: JwtService ) {}

  // ฟังก์ชันเช็ก Login แบบบ้านๆ
  async login(dto: LoginDto) {
    // 1. ค้นหา User
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // 2. ถ้าไม่มี User นี้ ให้ error
    if (!user) {
      throw new UnauthorizedException('ไม่พบผู้ใช้งานนี้ในระบบ');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    // 3. เช็ก User มีรหัสผ่านไหม และเทียบรหัสผ่าน (input vs database)
    // user.password คือรหัสที่ถูก hash ไว้แล้วใน DB
    if (!isMatch) {
      throw new UnauthorizedException('รหัสผ่านไม่ถูกต้อง');
    }

    // 4. ถ้าผ่านหมด ส่งข้อมูลเขากลับไป (ยกเว้นรหัสผ่าน)
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

    async register(dto: LoginDto) {

      const hashedPassword = await bcrypt.hash(dto.password, roundsOfHashing);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.email.split('@')[0],
        },
      }); 

      return {
        Message: 'สมัครสมาชิกสำเร็จ',
        user: { id: user.id, email: user.email },
      };
      
      } catch (error) {
    // P2002 คือรหัส Error ของ Prisma เวลาเจอข้อมูลซ้ำ (Unique constraint)
    if (error.code === 'P2002') {
      throw new ConflictException('อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น');
    }
    throw error; // ถ้าเป็น Error อื่น ก็ให้พังตามปกติ
  }
}