import { BaseEntity } from "../../../config/base.entity";
import { IInjured } from "../../../interfaces/injured.interface";
import { Entity, Column, ManyToOne } from "typeorm";
import { Sinister } from "../../../containers/sinister/entities/sinister.entity";

@Entity()
export class Injured extends BaseEntity implements IInjured{

     @Column()
     amount: number;

     @ManyToOne(() => Sinister, (sinister) => sinister.injuredd)
     sinister: Sinister;

};