import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ default: 'name1' })
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must be more then 3 symbols' })
  username: string;

  @ApiProperty({ default: '122123' })
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be more then 6 symbols' })
  password: string;
}
