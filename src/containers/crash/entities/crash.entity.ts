import { BaseEntity } from "../../../config/base.entity";
import { ICrash } from "../../../interfaces/crash.interface";
import { Column, Entity } from "typeorm";

@Entity({ name: 'crash' })
export class Crash extends BaseEntity implements ICrash {
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