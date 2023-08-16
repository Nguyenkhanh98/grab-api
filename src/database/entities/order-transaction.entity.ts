import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { OrderEntity } from './order.entity';
import { DriverEntity } from './driver.entity';

enum OrderStatus {
  ACTIVE = 'active',
  CANCEL = 'cancel',
  COMPLETED = 'complete',
  IN_PROGRESS = 'in-progress',
}

@Entity({
  name: 'order-transactions',
})
export class OrderTransactionEntity extends AbstractEntity {
  @ManyToOne(() => OrderEntity, (order) => order.orderTransactions)
  order: OrderEntity;

  @OneToOne(() => DriverEntity, (driver) => driver.orderTransaction)
  driver: DriverEntity;

  @Column()
  historyId: number;

  @Column()
  historyDate: Date;

  @Column()
  status: OrderStatus;

  @Column()
  @Exclude()
  acceptedAt: Date;

  @Column()
  @Exclude()
  cancelledAt: Date;

  @Column()
  @Exclude()
  completedAt: Date;

  @Column()
  @Exclude()
  feedback: string;
}
