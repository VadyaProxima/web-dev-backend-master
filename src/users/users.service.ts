import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as argon2 from 'argon2';
// import { Errors } from '../../src/constants/errors/index';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto) {
    const existingUser = await this.findByUsername(dto.username);
    if (existingUser) {
      throw new BadRequestException(
        `Пользователь ${dto.username} уже существует`,
      );
    }
    const user = {
      username: dto.username,
      password: await argon2.hash(dto.password),
    };
    try {
      return await this.repository.save(user);
    } catch (error) {
      throw new BadRequestException('Errors.SERVER_ERROR');
    }
  }

  async findByUsername(username: string) {
    return this.repository.findOne({
      where: { username: username },
    });
  }
  async findById(id: number) {
    return this.repository.findOne({
      where: { id: id },
    });
  }
  async deleteUser(deleteUser: DeleteUserDto, user) {
    try {
      const userData = await this.repository.findOne({
        where: { id: user.id },
      });
      const isPasswordCorrect = await argon2.verify(
        userData.password,
        deleteUser.password,
      );
      if (isPasswordCorrect) {
        return await this.repository.delete({ id: user.id });
      } else {
        throw new BadRequestException('Errors.PASSWORD_ERROR');
      }
    } catch (error) {
      throw new BadRequestException('Errors.SERVER_ERROR');
    }
  }
}
