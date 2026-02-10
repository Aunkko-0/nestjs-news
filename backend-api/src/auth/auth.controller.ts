import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';



@ApiTags('auth')
@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('register')
  async register(@Body() dto: LoginDto) {
    return this.authService.register(dto);
    }
}
