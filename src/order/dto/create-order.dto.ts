import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  deliveryAddress: string;

  @ApiProperty()
  cartId: number;
}
