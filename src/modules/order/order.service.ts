import { OrderEntity, OrderStatus } from '@database/entities/order.entity';
import { Injectable, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDTO, OrderDTO, OrderQuery, Pagination } from './order.dto';
import { AppException } from '@common/exceptions/app-exception';
import { ORDER_INPROGRES_EXIST } from '@common/exceptions/error';
import { UserEntity } from '@database/entities/user.entity';
import { plainToClass, plainToInstance } from 'class-transformer';

const CURSOR_KEY = 'order';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    @Req()
    private readonly orderRepository: Repository<OrderEntity>,
    private configService: ConfigService,
  ) {}

  async createOrder(orderData: CreateOrderDTO, user: UserEntity) {
    const orderInprogress: any = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderTransactions', 'orderTransactions')
      .leftJoinAndSelect('order.user', 'user')
      .where('user.id = :userId', { userId: user.id })
      .andWhere('order.status = :status', { status: 'active' })
      .getMany();

    if (orderInprogress.length) {
      throw new AppException(ORDER_INPROGRES_EXIST);
    }

    const orderCreate: OrderEntity = this.orderRepository.create({
      ...orderData,
      user,
    });

    const result = await this.orderRepository.save(orderCreate);
    return result;
  }
  async getOrders(
    query: OrderQuery,
    user: UserEntity,
  ): Promise<Pagination<OrderDTO>> {
    const { after, before, first, last } = query;

    let queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderTransactions', 'orderTransactions')
      .leftJoinAndSelect('order.user', 'user')
      .where('user.id = :userId AND order.status = :status', {
        userId: user.id,
        status: 'active',
      });

    let pageSize = first;
    if (after) {
      queryBuilder = queryBuilder.andWhere('order.id > :after', { after });
    }

    if (before) {
      pageSize = last;
      queryBuilder = queryBuilder.andWhere('order.id < :before', { before });
    }

    queryBuilder = queryBuilder.orderBy('order.id', 'ASC');

    if (first) {
      queryBuilder = queryBuilder.take(first + 1);
    } else if (last) {
      queryBuilder = queryBuilder.take(last);
    }

    const records = await queryBuilder.getMany();
    const hasNextPage = records.length > pageSize;

    const actualResults = hasNextPage ? records.slice(0, pageSize) : records;
    return {
      pageInfo: {
        hasNextPage,
        endCursor: actualResults[actualResults.length - 1]?.id,
      },
      records: plainToInstance(OrderDTO, actualResults),
    };
    // const orderInprogress: any = await this.orderRepository;
  }
}
