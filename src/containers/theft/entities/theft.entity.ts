import { BaseEntity } from '../../../config/base.entity';
import { ITheft } from '../../../interfaces/theft.interface';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'theft' })
export class Theft extends BaseEntity implements ITheft {
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
}
