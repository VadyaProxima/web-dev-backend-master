import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from './entities/order_item.entity';
import { OrderEntity } from './entities/order.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { CartService } from 'src/cart/cart.service';
import { CartItemEntity } from 'src/cart/entities/cart_item.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductService } from 'src/product/product.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Module } from '@nestjs/common';
import { CategoryEntity } from 'src/category/entities/category.entity';
// `import { BrandEntity } from 'src/brands/entities/brand.entity';`
import { PromoEntity } from 'src/promo/entities/promo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderItemEntity,
      ProductEntity,
      CartItemEntity,
      UserEntity,
      CategoryEntity,
      // BrandEntity,
      PromoEntity,
      OrderEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, CartService, ProductService],
})
export class OrderModule {}
