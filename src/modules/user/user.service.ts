import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AppException } from '@common/exceptions/app-exception';
import { USER_EXIST, WRONG_EMAIL_OR_PASSWORD } from '@common/exceptions/error';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto) {
    const findUser: UserEntity = await this.validateUser(
      loginData.phoneNumber,
      loginData.password,
    );
    return this.generateToken(findUser);
  }

  async register(registerData: RegisterDto) {
    const findUser = await this.userRepository.findOne({
      where: { phoneNumber: registerData.phoneNumber },
    });

    if (findUser) throw new AppException(USER_EXIST);

    const saveUser: UserEntity = this.userRepository.create({
      password: registerData.password,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      phoneNumber: registerData.phoneNumber,
    });

    return saveUser.save();
  }

  private async generateToken(user: UserEntity) {
    const payload = {
      sub: user.id,
      user,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      ),
    });

    return {
      accessToken,
      user,
    };
  }

  private async validateUser(phone: string, password: string) {
    const findUser = await this.userRepository.findOne({
      where: { phoneNumber: phone },
    });
    if (!findUser || !(await bcrypt.compare(password, findUser.password)))
      throw new AppException(WRONG_EMAIL_OR_PASSWORD);
    return findUser;
  }
}
