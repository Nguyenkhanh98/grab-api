import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { LoginDto, RegisterDto } from './user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '@common/config/multer';
// import { Multer } from 'multer';
@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() loginData: LoginDto) {
    return this.userService.login(loginData);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAttachment(@UploadedFile() file: Express.Multer.File) {
    console.log('Uploaded file:', file);

    return { message: 'File uploaded successfully' };
  }
  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() registerData: RegisterDto) {
    return this.userService.register(registerData);
  }
}
