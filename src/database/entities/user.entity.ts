import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { OrderEntity } from './order.entity';

@Entity({
  name: 'users',
})
export class UserEntity extends AbstractEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => OrderEntity, (order) => order.user, { nullable: true })
  orders: OrderEntity[];

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
