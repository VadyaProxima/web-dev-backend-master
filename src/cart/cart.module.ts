import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductEntity } from 'src/product/entities/product.entity';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart_item.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CartEntity, ProductEntity]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
