import { BaseEntity } from '../../../config/base.entity';
import { IFire } from '../../../interfaces/fire.interface';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'fire' })
export class Fire extends BaseEntity implements IFire {
  @Column()
  time: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  @Column()
  details: string;

  @Column()
  injured: boolean;

  @Column()
  injuries: string;

  @Column()
  ambulance: boolean;

  @Column()
  ambulanceTo: string;

  @Column()
  thirdInjured: boolean;
}
