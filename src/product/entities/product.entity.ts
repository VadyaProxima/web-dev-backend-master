
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from 'src/category/entities/category.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { CartEntity } from 'src/cart/entities/cart_item.entity';
// import { CartItemEntity } from 'src/cart/entities/cart_item.entity';
// import { BrandEntity } from 'src/brands/entities/brand.entity';
// import { PromoEntity } from 'src/promo/entities/promo.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => CategoryEntity, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity;

  @ApiHideProperty()
  @ManyToOne(() => CartEntity, (cart) => cart.products)
  cart: CartEntity;
}
