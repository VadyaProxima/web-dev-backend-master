import {
  Entity,
  OneToMany,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderItemEntity } from './order_item.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  address: string;

  @Column()
  totalPrice: number;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  @JoinColumn({ name: 'items' })
  items: OrderItemEntity[];
}
