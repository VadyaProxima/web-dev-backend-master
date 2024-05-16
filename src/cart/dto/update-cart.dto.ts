import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  itemId: number;

  @ApiProperty()
  @IsNumber()
  userId: number;

  // @ApiProperty()
  // @IsNumber()
  // quantity: number;
}
