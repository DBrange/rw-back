import { VehicleEntity } from "src/containers/vehicle/entities/vehicle.entity";
import { INewCarData } from "src/interfaces/newCarData.interface";
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'news_cars_data' })
export class NewCarDataEntity extends BaseEntity implements INewCarData {
  @Column()
  noBearingCertificate: string;

  @Column()
  purchaseCertificate: string;

  @OneToOne(() => VehicleEntity)
  @JoinColumn()
  vehicle: string;
};