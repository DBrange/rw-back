import { Smartphone } from "../../../containers/smartphones/entities/smartphone.entity";
import { BaseEntity } from "../../../config/base.entity";
import { ETYPE } from "../../../constants/enums";
// import { ElectronicsModels } from "../../../containers/electronics-models/entities/electronicsModels.entity";
import { IElectronics } from "../../../interfaces/electronics.interface";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Electronics extends BaseEntity implements IElectronics {

     @Column({type: "enum" , enum: ETYPE })
     type: ETYPE;

     @Column()
     brand: string;

     @Column()
     model: string;
     // @ManyToOne(() => ElectronicsModels, (electronicModels) => electronicModels.electronics)
     // electronicModels: ElectronicsModels;
     
     @OneToOne(() => Smartphone)
     @JoinColumn()
     smartphone: Smartphone;
};