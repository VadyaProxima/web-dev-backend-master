import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import * as fs from 'fs';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  create(
    dto: CreateCategoryDto,
    image: Express.Multer.File,
  ): Promise<CategoryEntity> {
    // console.log(dto, dto.name);
    return this.repository.save({
      image: image.filename,
      name: dto.name,
      // subcategory: dto.subcategory,
    });
  }
  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateCategoryDto, image: Express.Multer.File) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.name) {
      toUpdate.name = dto.name;
    }
    // if (dto.subcategory) {
    //   toUpdate.subcategory = dto.subcategory;
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

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
