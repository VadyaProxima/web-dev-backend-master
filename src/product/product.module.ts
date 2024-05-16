import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './entities/product.entity';
import { CategoryModule } from 'src/category/category.module';
import { CategoryEntity } from 'src/category/entities/category.entity';
// import { BrandEntity } from 'src/brands/entities/brand.entity';
// import { BrandModule } from 'src/brands/brands.module';
// import { BrandEntity } from 'src/brands/entities/brand.entity';
import { PromoEntity } from 'src/promo/entities/promo.entity';
import { PromoModule } from 'src/promo/promo.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryEntity,
      // BrandEntity,
      PromoEntity,
    ]),
    CategoryModule,
    // BrandModule,
    PromoModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
