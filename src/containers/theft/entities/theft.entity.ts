import { TheftTireEntity } from "src/containers/theft-tire/entities/theft-tire.entity";
import { ITheft } from "src/interfaces/theft.interface";
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'thefts' })
export class TheftEntity extends BaseEntity implements ITheft {
  @Column()
  time: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  @Column({ array: true })
  reportPhoto: string;

  @Column()
  isTire: boolean;

  @OneToOne(() => TheftTireEntity)
  @JoinColumn()
  theftTire: string;
}
