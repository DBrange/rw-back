import { ElectronicsBrands } from "../../../containers/electronics-brands/entities/electronicsBrands.entity";
import { BaseEntity } from "../../../config/base.entity";
import { Electronics } from "../../../containers/electronics/entities/electronics.entity";
import { IElectronicsModel } from "../../../interfaces/electronicsModels.interface";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class ElectronicsModels extends BaseEntity implements IElectronicsModel {

     @Column()
     name: string;

     @OneToMany(() => Electronics, (electronics) => electronics.electronicModels)
     electronics: Electronics[];

     @ManyToOne(() => ElectronicsBrands, (electronicsBrands) => electronicsBrands.electronicModels)
     electronicsBrands: ElectronicsBrands;
};