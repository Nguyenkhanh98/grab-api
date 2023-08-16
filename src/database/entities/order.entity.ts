import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { OrderTransactionEntity } from './order-transaction.entity';
import { UserEntity } from './user.entity';

enum ORDER_TYPE {
  SCHEDULE = 'schedule',
  NORMAL = 'normal',
}

export enum OrderStatus {
  ACTIVE = 'active',
  CANCEL = 'cancel',
  IN_PROGRESS = 'in-progress',
}

@Entity({
  name: 'orders',
})
export class OrderEntity extends AbstractEntity {
  @Column()
  source: string;

  @Column()
  destination: string;

  @Column({ default: ORDER_TYPE.NORMAL })
  orderType: ORDER_TYPE;

  @OneToMany(
    () => OrderTransactionEntity,
    (orderTransaction) => orderTransaction.order,
    { nullable: true },
  )
  orderTransactions: OrderTransactionEntity[];

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @Column({ default: OrderStatus.ACTIVE })
  status: OrderStatus;
}
