import {
  Entity,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiHideProperty()
  @OneToMany(() => ProductEntity, (product) => product.cart)
  products: ProductEntity;

  @Column()
  productId: number;

  @Column()
  userId: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  name: string;

  @Column()
  image: string;

  // @ManyToOne(() => UserEntity, (user) => user.baskets)
  // user: UserEntity;
}
