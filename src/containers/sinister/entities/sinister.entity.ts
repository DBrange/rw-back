import { BaseEntity } from '../../../config/base.entity';
import { AssetEntity } from '../../../containers/asset/entities/asset.entity';
import { ISinister } from '../../../interfaces/sinister.interface';
import { ThirdPartyVehicle } from '../../../containers/third-party-vehicle/entities/thirdPartyVehicle.entity';
import { Injured } from '../../../containers/injured/entities/injured.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'sinister' })
export class Sinister extends BaseEntity implements ISinister {
  @Column()
  time: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  @ManyToOne(() => AssetEntity, (asset) => asset.sinister)
  asset: AssetEntity;

  @OneToMany(
    () => ThirdPartyVehicle,
    (thirdPartyVehicle) => thirdPartyVehicle.sinister,
  )
  thirdPartyVehicle: ThirdPartyVehicle[];

  @OneToMany(() => Injured, (injuredd) => injuredd.sinister)
  injuredd: Injured[];
}
