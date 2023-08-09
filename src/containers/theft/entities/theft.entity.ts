import { BaseEntity } from "../../../config/base.entity";
import { ITheft } from "../../../interfaces/theft.interface";
import { Entity, Column } from "typeorm";

@Entity()
export class Theft extends BaseEntity implements ITheft {

     @Column()
     reportPhoto: string[];
     
};