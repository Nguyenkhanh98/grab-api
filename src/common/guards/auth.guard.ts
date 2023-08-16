import { AUTH_KEY } from '@common/decorators/Auth.decorator';
import { UserEntity } from 'database/entities/user.entity';
import { AppException } from '@common/exceptions/app-exception';
import { UN_AUTHORIZED, USER_NOT_FOUND } from '@common/exceptions/error';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requiredAuth = this.reflector.getAllAndOverride<boolean>(AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredAuth) {
      if (!request.headers['authorization']) {
        throw new AppException(UN_AUTHORIZED);
      }
      const accessToken = request.headers['authorization'].split(' ')[1];

      const verifyToken = this.authenticationHandle(
        accessToken,
        this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      );
      const findUser: UserEntity = await this.userRepository.findOne({
        where: { id: verifyToken.user.id },
      });

      if (!findUser) {
        throw new AppException(USER_NOT_FOUND);
      }

      request.user = { ...findUser };
    }

    return true;
  }

  private authenticationHandle(accessToken: string, secret: string) {
    try {
      return this.jwtService.verify(accessToken, {
        secret,
      });
    } catch (error) {
      throw new AppException(UN_AUTHORIZED);
    }
  }
}
