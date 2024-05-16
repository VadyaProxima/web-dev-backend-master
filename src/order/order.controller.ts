import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('order')
@Controller('order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto, @Req() req: any) {
    console.log(req);
    // authInfo = undefined
    return this.orderService.order(req.user, dto.address);
  }

  @Get(':id')
  findOne(@Req() req: any) {
    return this.orderService.getOrders(req.user.id);
  }
}
