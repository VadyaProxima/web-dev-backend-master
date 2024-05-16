import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { CategoryEntity } from 'src/category/entities/category.entity';
// import { BrandEntity } from 'src/brands/entities/brand.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,

    // @InjectRepository(BrandEntity)
    // private brandRepository: Repository<BrandEntity>,
  ) {}

  async create(
    dto: CreateProductDto,
    image: Express.Multer.File,
  ): Promise<ProductEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
    });

    // const brand = await this.brandRepository.findOne({
    //   where: { id: dto.brandId },
    // });

    if (!category) {
      throw new BadRequestException(
        `Некорректная категория: id=${dto.categoryId}`,
      );
    }

    // if (!brand) {
    //   throw new BadRequestException(`Некоррктный бренд: id=${dto.brandId}`);
    // }

    const product = new ProductEntity();
    product.image = image.filename;
    product.name = dto.name;
    // product.description = dto.description;
    // product.amount = dto.amount;
    product.price = dto.price;
    product.category = category;
    // product.brand = brand;
    const newProduct = await this.productRepository.save(product);

    return newProduct;
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateProductDto, image: Express.Multer.File) {
    const toUpdate = await this.productRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.name) {
      toUpdate.name = dto.name;
    }
    // if (dto.description) {
    //   toUpdate.description = dto.description;
    // }
    // if (dto.amount) {
    //   toUpdate.amount = dto.amount;
    // }
    if (dto.price) {
      toUpdate.price = dto.price;
    }
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
    return this.productRepository.save(toUpdate);
  }

  async remove(id: number) {
    return this.productRepository.delete(id);
  }
}
