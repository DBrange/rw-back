import { IDamage } from "src/interfaces/damage.interface";
import { Entity, Column } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'damages' })
export class DamageEntity extends BaseEntity implements IDamage {
  @Column()
  time: string;

  @Column()
  date: Date;

  @Column()
  location: string;
  
  @Column()
  details: string;

  @Column({ array: true })
  reportPhoto: string;

  @Column({ nullable: true })
  budget: string;
};