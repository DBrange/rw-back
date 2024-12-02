// import { Vehicle } from "../../../containers/vehicle/entities/vehicle.entity";
import { BaseEntity } from "../../../config/base.entity";
import { CarBrands } from "../../../containers/car-brands/entities/carBrands.entity";
import { ICarModel } from "../../../interfaces/carModels.interface";
import { Entity, Column, ManyToOne, } from "typeorm";

@Entity({name: 'car_models'})
export class CarModel extends BaseEntity implements ICarModel {

     @Column()
     name: string;

     @ManyToOne(() => CarBrands, (carBrands) => carBrands.carModel)
     carBrands: CarBrands;

     // @OneToMany(() => Vehicle, (vehicle) => vehicle.carModel)
     // vehicle: Vehicle[];
};