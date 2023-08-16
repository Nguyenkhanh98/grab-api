import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() registerData: RegisterDto) {
    return this.authService.register(registerData);
  }
}
