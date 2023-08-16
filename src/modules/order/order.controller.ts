import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDTO, OrderDTO, OrderQuery, Pagination } from './order.dto';
import { UserEntity } from '@database/entities/user.entity';
import { Auth } from '@common/decorators/Auth.decorator';
import { UseRoles } from 'nest-access-control';
import { AppResource } from '@common/constants/resource';

@ApiTags('orders')
@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  @Auth()
  //   @UseRoles({
  //     resource: AppResource.ORDER,
  //     action: 'read',
  //     possession: 'own',
  //   })
  @UseInterceptors(ClassSerializerInterceptor)
  async createOrder(
    @Body() orderData: CreateOrderDTO,
    @Req() request: Request,
  ) {
    const user = request['user'] as UserEntity;
    return this.orderService.createOrder(orderData, user);
  }

  @Get('')
  @Auth()
  async getOrder(
    @Query() orderQuery: OrderQuery,
    @Req() request: Request,
  ): Promise<Pagination<OrderDTO>> {
    const user = request['user'] as UserEntity;
    return this.orderService.getOrders(orderQuery, user);
  }

  // @Post('schedule')
  // @UseInterceptors(ClassSerializerInterceptor)
  // async register(@Body() registerData: RegisterDto) {
  //   return this.userService.register(registerData);
  // }
}
