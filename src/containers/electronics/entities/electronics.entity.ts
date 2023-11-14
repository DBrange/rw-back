
import { AssetEntity } from "src/containers/asset/entities/asset.entity";
import { BaseEntity } from "../../../config/base.entity";
import { ETYPE } from "../../../constants/enums";
// import { ElectronicsModels } from "../../../containers/electronics-models/entities/electronicsModels.entity";
import { IElectronics } from "../../../interfaces/electronics.interface";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Smartphone } from "src/containers/smartphones/entities/smartphone.entity";

@Entity({ name: 'electronics' })
export class Electronics extends BaseEntity implements IElectronics {
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
  asset: AssetEntity;

  @OneToOne(() => Smartphone, (smartphone) => smartphone.electronics, { cascade: true })
  @JoinColumn()
  smartphones: Smartphone;
};