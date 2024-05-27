import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateCartDto } from './dto/update-cart.dto';

@ApiTags('cart')
@Controller('cart')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(1, createCartDto);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get('total-price')
  async getTotalPrice(): Promise<number> {
    return await this.cartService.calculateTotalPrice();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatecartDto: UpdateCartDto) {
    return this.cartService.update(+id, updatecartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
