import { BaseEntity } from "src/config/base.entity";
import { ETYPE } from "src/constants/enums";
import { AssetEntity } from "src/containers/asset/entities/asset.entity";
import { SmartphoneEntity } from "src/containers/smartphone/entities/smartphone.entity";
import { IElectronic } from "src/interfaces/electronics.interface";
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";


@Entity({ name: 'electronics' })
export class ElectronicEntity extends BaseEntity implements IElectronic {
  @Column({ type: 'enum', enum: ETYPE })
  type: ETYPE;

  @Column()
  brand: string;

  @Column()
  model: string;
  // @ManyToOne(() => ElectronicsModels, (electronicModels) => electronicModels.electronics)
  // electronicModels: ElectronicsModels;

  @OneToOne(() => AssetEntity)
  @JoinColumn()
  asset: string;

  @OneToOne(() => SmartphoneEntity, (smartphone) => smartphone.electronic, {
    cascade: true,
  })
  @JoinColumn()
  smartphone: string;
};