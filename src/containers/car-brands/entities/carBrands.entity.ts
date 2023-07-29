import { BaseEntity } from "../../../config/base.entity";
import { CarModel } from "../../../containers/car-models/entities/carModel.entity";
import { ICarBrand } from "../../../interfaces/carBrands.interface";
import { Entity, Column, OneToMany } from "typeorm";

@Entity()
export class CarBrands extends BaseEntity implements ICarBrand {

     @Column()
     name: string;

     @OneToMany(() => CarModel, (carModel) => carModel.carBrands)
     carModel: CarModel[];
};