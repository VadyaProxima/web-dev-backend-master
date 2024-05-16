// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('product')
// export class ProductEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   image: string;

//   @Column()
//   title: string;

//   @Column()
//   text: string;
// }
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

  // @Column()
  // description: string;

  // @Column()
  // amount: number;

  @Column()
  price: number;

  @ManyToOne(() => CategoryEntity, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity;

  // @ManyToMany(() => CartItemEntity, (cart) => cart.item, {
  //   eager: true,
  // })
  // @JoinColumn()
  // carts: CartItemEntity[];

  // @ManyToOne(() => BrandEntity, {
  //   eager: true,
  // })
  // @JoinColumn()
  // brand: BrandEntity;

  // @OneToOne(() => PromoEntity, (promo) => promo.product, {
  //   eager: true,
  // })
  // @JoinColumn()
  // promo: PromoEntity;
}
