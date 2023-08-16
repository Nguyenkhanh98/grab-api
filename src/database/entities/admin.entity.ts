import { AppRoles } from '@common/constants/role';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity({
  name: 'admin',
})
export class AdminEntity extends AbstractEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: AppRoles.USER })
  role: AppRoles;

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
