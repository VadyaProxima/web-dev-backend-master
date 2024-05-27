import { ApiHideProperty } from '@nestjs/swagger';
import { CartEntity } from 'src/cart/entities/cart_item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // @ApiHideProperty()
  // @ManyToOne(() => CartEntity, (cart) => cart.user)
  // cart: CartEntity;
}
