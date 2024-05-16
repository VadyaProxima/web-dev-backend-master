import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty()
  itemId: number;

  @ApiProperty()
  userId: number;
  
  // @ApiProperty()
  // quantity: number;
}
