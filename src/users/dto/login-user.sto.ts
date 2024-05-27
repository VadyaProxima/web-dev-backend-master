import { ApiProperty } from '@nestjs/swagger';
export class LoginUserDto {
  @ApiProperty({ default: 'name1' })
  username: string;

  @ApiProperty({ default: '123' })
  password: string;
}
