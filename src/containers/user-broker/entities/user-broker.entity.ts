import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseEntity } from 'src/config/base.entity';
import { LegalUsers } from 'src/containers/legal-users/entities/legalUsers.entity';
import { UserEntity } from 'src/containers/users/entities/user.entity';
import { IUserBroker } from 'src/interfaces/broker-user.interface';
import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'user_broker' })
export class UserBrokerEntity extends BaseEntity implements IUserBroker {
  @Column()
  bussinesName: string;

  @Column({ unique: true })
  enrollment: string;

  @Column()
  card: string;

  // @OneToOne(() => UserEntity)
  // @JoinColumn()
  // user: UserEntity | LegalUsers;

  @OneToMany(() => UserEntity, (user) => user.userBroker)
  @JoinColumn()
  clients: UserEntity[];

  @OneToMany(() => LegalUsers, (user) => user.userBroker)
  @JoinColumn()
  legalClients: LegalUsers[];
}

export class UserBrokerUpdateDTO {
  @IsOptional()
  @IsString()
  bussinesName: string;

  @IsOptional()
  @IsString()
  enrollment: string;

  @IsOptional()
  @IsString()
  card: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  clients: UserEntity[];

  @IsOptional()
  @IsUUID('4', { each: true })
  legalClients: LegalUsers[];
}
