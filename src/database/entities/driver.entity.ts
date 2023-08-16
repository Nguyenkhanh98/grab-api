import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { OrderTransactionEntity } from './order-transaction.entity';

@Entity({
  name: 'drivers',
})
export class DriverEntity extends AbstractEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @OneToMany(
    () => OrderTransactionEntity,
    (orderTransaction) => orderTransaction.driver,
  )
  orderTransaction: OrderTransactionEntity[];

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
