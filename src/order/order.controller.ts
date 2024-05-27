import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: OrderEntity })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created',
  })
  async createOrder(
    @Req() req,
    @Body('deliveryAddress') deliveryAddress: string,
  ): Promise<OrderEntity> {
    const { id } = req.user;
    return this.orderService.createOrder(id, deliveryAddress);
  }
}
