import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartItemEntity } from './entities/cart_item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CartService {
  async getItemsInCart(userId: number): Promise<CartItemEntity[]> {
    console.log(userId);
    // const userCart = await this.cartItemRepository
    //   .createQueryBuilder('c')
    //   .innerJoinAndSelect(ProductEntity, 'p', 'c.itemId=p.id')
    //   .where('c.userId = :userId', {
    //     userId: userId,
    //   })
    //   .execute();
    const userCart = await this.cartItemRepository.findBy({
      user: { id: userId },
    });
    console.log('CartService>', userCart);
    // return (await userCart).filter((item) => item.user.id === userId);
    return userCart;
  }

  constructor(
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async create(dto: CreateCartDto, userId: number) {
    // create new record
    const cartItem = new CartItemEntity();
    cartItem.user = await this.userRepository.findOneBy({ id: userId });
    console.log(cartItem.user.id, userId);
    cartItem.item = await this.productRepository.findOneBy({
      id: dto.itemId,
    });
    // cartItem.quantity = dto.quantity;
    return await this.cartItemRepository.save(cartItem);
  }

  async update(dto: UpdateCartDto, userId: number) {
    const userCart = await this.cartItemRepository
      .createQueryBuilder()
      .select('t.*')
      .from(CartItemEntity, 't')
      .where('t.userId = :userId and t.itemId = :itemId', {
        userId: userId,
        itemId: dto.itemId,
      })
      .execute();
    if (userCart.length === 0) {
      throw new BadRequestException(`Записи с id=${dto.itemId} не найдено`);
    }
    console.log('update');
    console.log(userCart);
    // update existing record

    // userCart[0].quantity = userCart[0].quantity + dto.quantity;
    const updatedCart = await this.cartItemRepository.save(userCart);
    console.log('1d');
    return updatedCart;
  }

  async findAll() {
    return this.cartItemRepository.find();
  }

  async get(userId: number) {
    return await this.cartItemRepository
      .createQueryBuilder()
      .select()
      .from(CartItemEntity, 't')
      .where('t.userId = :userId', { userId: userId })
      .execute();
  }

  // todo
  // async update(id: number, dto: UpdateCartDto) {
  //   const toUpdate = await this.cartItemRepository.findOneBy({ id });
  //   if (!toUpdate) {
  //     throw new BadRequestException(`Записи с id=${id} не найдено`);
  //   }
  //   if (dto.quantity) {
  //     toUpdate.quantity = dto.quantity;
  //   }
  //   return this.cartItemRepository.save(toUpdate);
  // }

  async remove(id: number) {
    return this.cartItemRepository.delete(id);
  }

  async clearCart(userId: number) {
    await this.cartItemRepository
      .createQueryBuilder()
      .delete()
      .from(CartItemEntity)
      .where('userId = :userId', { userId: userId })
      .execute();
  }
}
