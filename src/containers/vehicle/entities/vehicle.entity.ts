import { FUEL, TYPE } from "src/constants/enums";
import { AssetEntity } from "src/containers/asset/entities/asset.entity";
import { GncEntity } from "src/containers/gnc/entities/gnc.entity";
import { IVehicle } from "src/interfaces/vehicle.interface";
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'vehicles' })
export class VehicleEntity extends BaseEntity implements IVehicle {
  @Column()
  year: number;

  @Column()
  color: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ nullable: true })
  tireBrand: string;

  @Column({ nullable: true })
  tireSize: string;

  @Column({ nullable: true })
  tireWear: number;

  @Column()
  damage: boolean;

  @Column({ nullable: true })
  damageLocation: string;

  @Column({ array: true })
  images: string;

  @Column()
  plate: string;

  @Column()
  gnc: boolean;

  @Column({ type: 'enum', enum: FUEL })
  fuel: FUEL;

  @Column({ type: 'enum', enum: TYPE })
  type: TYPE;

  @Column()
  okm: boolean;

  @Column()
  explodedAirbag: boolean;

  @Column()
  noSpareTire: boolean;

  @OneToOne(() => GncEntity, (gnc) => gnc.vehicle)
  @JoinColumn()
  gncId: string;

  @OneToOne(() => AssetEntity)
  @JoinColumn()
  asset: string;
};