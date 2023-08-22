import { BaseEntity } from "../../../config/base.entity";
import { IDamage } from "../../../interfaces/damage.interface";
import { Column, Entity } from "typeorm";

@Entity({name: 'damage'})
export class Damage extends BaseEntity implements IDamage {

     @Column()
     details: string;

     @Column({array: true})
     photo: string;
     
};