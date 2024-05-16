import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  image: Express.Multer.File;

  @ApiProperty()
  name = 'Тренажер';

  @ApiProperty()
  description = 'Описание';

  @ApiProperty()
  amount = 10;

  @ApiProperty()
  price = 10000;

  @ApiProperty()
  category;

  // @ApiProperty()
  // promoId;
}
