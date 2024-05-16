import { ApiHideProperty } from '@nestjs/swagger';
import { ProductEntity } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  // @Column()
  // subcategory: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // @ApiHideProperty()
  // @OneToMany(() => ProductEntity, (product) => product.category)
  // products: ProductEntity[];
}
