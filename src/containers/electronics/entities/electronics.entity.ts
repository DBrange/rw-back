import { Smartphone } from "../../../containers/smartphones/entities/smartphone.entity";
import { BaseEntity } from "../../../config/base.entity";
import { ETYPE } from "../../../constants/enums";
import { ElectronicsModels } from "../../../containers/electronics-models/entities/electronicsModels.entity";
import { IElectronics } from "../../../interfaces/electronics.interface";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class Electronics extends BaseEntity implements IElectronics {

     @Column({type: "enum" , enum: ETYPE })
     type: ETYPE;

     @ManyToOne(() => ElectronicsModels, (electronicModels) => electronicModels.electronics)
     electronicModels: ElectronicsModels;
     
     @OneToOne(() => Smartphone)
     @JoinColumn()
     smartphone: Smartphone;
};