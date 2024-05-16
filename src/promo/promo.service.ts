import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';

import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { PromoEntity } from './entities/promo.entity';

@Injectable()
export class PromoService {
  constructor(
    @InjectRepository(PromoEntity)
    private repository: Repository<PromoEntity>,
  ) {}

  async create(
    dto: CreatePromoDto,
    image: Express.Multer.File,
  ): Promise<PromoEntity> {
    return this.repository.save({
      image: image.filename,
      title: dto.title,
      text: dto.text,
      // rating: dto.rating,
      // price: dto.price,
    });
  }

  async findAll(): Promise<PromoEntity[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<PromoEntity> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdatePromoDto, image: Express.Multer.File) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.text) {
      toUpdate.text = dto.text;
    }
    if (dto.title) {
      toUpdate.title = dto.title;
    }
    // if (dto.rating) {
    //   toUpdate.rating = dto.rating;
    // }
    // if (dto.price) {
    //   toUpdate.price = dto.price;
    // }
    if (image) {
      if (toUpdate.image !== image.filename) {
        fs.unlink(`db_images/promo/${toUpdate.image}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      toUpdate.image = image.filename;
    }
    return this.repository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
