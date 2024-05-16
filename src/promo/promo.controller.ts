import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Response,
} from '@nestjs/common';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { PromoService } from './promo.service';
import { fileStorage } from './storage';
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { PromoEntity } from './entities/promo.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('promo')
@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  create(
    @Body() dto: CreatePromoDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<PromoEntity> {
    return this.promoService.create(dto, image);
  }

  @Get()
  findAll(): Promise<PromoEntity[]> {
    return this.promoService.findAll();
  }

  @Get('/image/:path')
  download(@Param('path') path: string, @Response() response) {
    return response.sendFile(path, { root: './db_images/promo' });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PromoEntity> {
    return this.promoService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePromoDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<PromoEntity> {
    return this.promoService.update(+id, dto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.promoService.delete(+id);
  }
}
