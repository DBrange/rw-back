import { ICrash } from "src/interfaces/crash.interface";
import { Entity, Column } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'crashes' })
export class CrashEntity extends BaseEntity implements ICrash {
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

  @Column()
  friendlyStatement: boolean;
};