import { InjuredInfoEntity } from "src/containers/injured-info/entities/injured-info.entity";
import { SinisterEntity } from "src/containers/sinister/entities/sinister.entity";
import { IInjured } from "src/interfaces/injured.interface";
import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'injureds' })
export class InjuredEntity extends BaseEntity implements IInjured {
  @Column()
  amount: number;

  // @ManyToOne(() => InjuredInfo, (injuredInfo) => injuredInfo.injureds)
  // @JoinColumn({
  //   name: 'injured_injuredInfo',
  // })
  // injuredInfo: InjuredInfo;

  @OneToMany(() => InjuredInfoEntity, (injuredsInfo) => injuredsInfo.injured)
  injuredsInfo: InjuredInfoEntity[];

  @ManyToOne(() => SinisterEntity, (sinister) => sinister.injuredd)
  sinister: string;
};