import { BaseEntity } from "../../../config/base.entity";
import { IInjured } from "../../../interfaces/injured.interface";
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Sinister } from "../../../containers/sinister/entities/sinister.entity";
import { InjuredInfo } from "../../../containers/injured-info/entities/injuredInfo.entity";

@Entity({ name: 'injured' })
export class Injured extends BaseEntity implements IInjured {
  @Column()
  amount: number;

  // @ManyToOne(() => InjuredInfo, (injuredInfo) => injuredInfo.injureds)
  // @JoinColumn({
  //   name: 'injured_injuredInfo',
  // })
  // injuredInfo: InjuredInfo;

  @OneToMany(() => InjuredInfo, (injuredsInfo) => injuredsInfo.injured)
  injuredsInfo: InjuredInfo[];

  @ManyToOne(() => Sinister, (sinister) => sinister.injuredd)
  sinister: Sinister;
};