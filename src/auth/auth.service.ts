import {
  ForbiddenException,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string) {
    try {
      const user = await this.usersService.findByUsername(username);
      const passwordIsMatch = argon2.verify(user.password, password);
      if (user && passwordIsMatch) {
        const { password, ...result } = user;
        return result;
      }
    } catch (error) {
      throw new BadRequestException('User not found');
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    const isCreateUsers = this.configService.get('CREATE_USERS') === 'true';
    if (!isCreateUsers) {
      throw new BadRequestException('Запрещено создавать новых пользователей');
    }

    try {
      const userData = await this.usersService.create(dto);
      const { password, ...user } = userData;
      return {
        user,
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (err) {
      // throw new ForbiddenException('Ошибка при регистрации');
      throw new ForbiddenException(err.message);
    }
  }

  async login(userData: UserEntity) {
    const { password, ...user } = userData;
    return {
      user,
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}