import { VehicleEntity } from "src/containers/vehicle/entities/vehicle.entity";
import { IGnc } from "src/interfaces/gnc.interface";
import { Entity, Column, OneToOne } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'gncs' })
export class GncEntity extends BaseEntity implements IGnc {
  @Column()
  expireDate: Date;

  @Column()
  oblea: string;

  @Column()
  plate: string;

  @OneToOne(() => VehicleEntity, (vehicle) => vehicle.gncId)
  vehicle: string;
};