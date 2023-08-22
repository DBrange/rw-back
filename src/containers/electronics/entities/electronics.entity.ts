
import { BaseEntity } from "../../../config/base.entity";
import { ETYPE } from "../../../constants/enums";
// import { ElectronicsModels } from "../../../containers/electronics-models/entities/electronicsModels.entity";
import { IElectronics } from "../../../interfaces/electronics.interface";
import { Column, Entity } from "typeorm";

@Entity({name: 'electronics'})
export class Electronics extends BaseEntity implements IElectronics {

     @Column({type: "enum" , enum: ETYPE })
     type: ETYPE;

     @Column()
     brand: string;

     @Column()
     model: string;
     // @ManyToOne(() => ElectronicsModels, (electronicModels) => electronicModels.electronics)
     // electronicModels: ElectronicsModels;
   
};