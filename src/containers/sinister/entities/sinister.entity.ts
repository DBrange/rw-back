import { AssetEntity } from "src/containers/asset/entities/asset.entity";
import { InjuredEntity } from "src/containers/injured/entities/injured.entity";
import { SinisterTypeEntity } from "src/containers/sinister-type/entities/sinister-type.entity";
import { ThirdPartyVehicleEntity } from "src/containers/third-party-vehicle/entities/third-party-vehicle.entity";
import { ISinister } from "src/interfaces/sinister.interface";
import { Entity, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'sinisters' })
export class SinisterEntity extends BaseEntity implements ISinister {
  @Column()
  time: string;

  @Column()
  date: Date;

  @Column()
  location: string;
  
  @Column({nullable: true})
  pdf: string;

  @ManyToOne(() => AssetEntity, (asset) => asset.sinisters)
  asset: AssetEntity;

  @OneToMany(
    () => ThirdPartyVehicleEntity,
    (thirdPartyVehicle) => thirdPartyVehicle.sinister,
  )
  thirdPartyVehicle: string[];

  @OneToMany(() => InjuredEntity, (injuredd) => injuredd.sinister)
  injuredd: string[];

  @OneToOne(() => SinisterTypeEntity)
  @JoinColumn()
  sinisterType: SinisterTypeEntity;
}
