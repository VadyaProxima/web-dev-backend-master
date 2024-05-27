import { ApiHideProperty } from '@nestjs/swagger';
import { CartEntity } from 'src/cart/entities/cart_item.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  products: string;

  @Column()
  deliveryAddress: string;

  @Column()
  orderTime: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => CartEntity, (cart) => cart.cart)
  cart: CartEntity;
}
