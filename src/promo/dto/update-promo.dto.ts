import { PartialType } from '@nestjs/mapped-types';
import { CreatePromoDto } from './create-promo.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePromoDto extends PartialType(CreatePromoDto) {
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
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  rating: number = 5;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  price: number = 10000;
}
