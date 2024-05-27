import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { CartEntity } from '../cart/entities/cart_item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  async createOrder(id: number, deliveryAddress: string): Promise<OrderEntity> {
    const cartItems = await this.cartRepository.find();
    const cartProducts = cartItems.map((cartItem) =>
      cartItem.productId.toString(),
    );

    const newOrder = new OrderEntity();
    newOrder.products = cartProducts.join(', ');
    newOrder.deliveryAddress = deliveryAddress;
    newOrder.orderTime = new Date();
    newOrder.totalPrice = await this.calculateTotalPrice();
    // newOrder.userId = id;

    return await this.orderRepository.save(newOrder);
  }

  async calculateTotalPrice(): Promise<number> {
    const cartItems = await this.cartRepository.find();
    let totalPrice = 0;

    cartItems.forEach((cartItem) => {
      totalPrice += cartItem.price * cartItem.quantity;
    });

    return totalPrice;
  }
}
