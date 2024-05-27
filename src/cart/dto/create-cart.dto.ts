import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  quantity: number;
}
