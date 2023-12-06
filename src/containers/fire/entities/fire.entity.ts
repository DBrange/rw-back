import { IFire } from "src/interfaces/fire.interface";
import { Entity, Column } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'fires' })
export class FireEntity extends BaseEntity implements IFire {
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
