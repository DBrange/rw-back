import { BaseEntity } from "../../../config/base.entity";
import { ElectronicsModels } from "../../../containers/electronics-models/entities/electronicsModels.entity";
import { IElectronicsBrands } from "../../../interfaces/electronicsBrands.interface";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class ElectronicsBrands extends BaseEntity implements IElectronicsBrands {
     
     @Column()
     type: string;

     @OneToMany(() => ElectronicsModels, (electronicModels) => electronicModels.electronicsBrands)
     electronicModels: ElectronicsModels[];
};