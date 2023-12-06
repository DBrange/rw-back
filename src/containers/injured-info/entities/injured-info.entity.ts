import { GENDER } from 'src/constants/enums';
import { InjuredEntity } from 'src/containers/injured/entities/injured.entity';
import { IInjuredInfo } from 'src/interfaces/injuredInfo.interface';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'injureds_info' })
export class InjuredInfoEntity extends BaseEntity implements IInjuredInfo {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: GENDER })
  gender: GENDER;

  @Column()
  dni: string;

  @Column()
  injuries: string;

  @ManyToOne(() => InjuredEntity, (injured) => injured.injuredsInfo)
  @JoinColumn({
    name: 'injured_injuredInfo',
  })
  injured: InjuredEntity;

  // @OneToMany(() => Injured, (injureds) => injureds.injuredInfo)
  // injureds: Injured[];
}
