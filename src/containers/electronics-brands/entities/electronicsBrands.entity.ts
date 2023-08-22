import { BaseEntity } from "../../../config/base.entity";
import { ElectronicsModels } from "../../../containers/electronics-models/entities/electronicsModels.entity";
import { IElectronicsBrands } from "../../../interfaces/electronicsBrands.interface";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({name: 'electronics_brands'})
export class ElectronicsBrands extends BaseEntity implements IElectronicsBrands {
     
     @Column()
     name: string;

     @OneToMany(() => ElectronicsModels, (electronicModels) => electronicModels.electronicsBrands)
     electronicModels: ElectronicsModels[];
};