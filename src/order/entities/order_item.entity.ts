import {
  Entity,
  JoinColumn,
  OneToOne,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderEntity } from './order.entity';

@Entity('order_item')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn()
  item: ProductEntity;

  // @OneToOne(() => UserEntity, (user) => user.id)
  // @JoinColumn({ name: 'userId' })
  // user: UserEntity;

  @Column()
  quantity: number;

  // @Column({ default: false })
  // pending: boolean;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;
}
