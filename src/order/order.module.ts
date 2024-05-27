import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './order.service';
import { CartEntity } from '../cart/entities/cart_item.entity';
import { ConfigModule } from '@nestjs/config';
import { OrderController } from './order.controller';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([OrderEntity, CartEntity])],
  providers: [OrderService],
  exports: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
