import { ApiProperty } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateProductDto {
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
  @IsNotEmpty()
  @IsString()
  name: string = 'Тренажер';

  // @ApiProperty()
  // @IsString()
  // description: string = 'Описание';

  // @ApiProperty()
  // amount: number = 10;

  @ApiProperty()
  price: number = 10000;

  @ApiProperty()
  @IsNumberString()
  categoryId: number;

  // @ApiProperty()
  // @IsNumberString()
  // brandId: number;
}
