import { ElectronicEntity } from "src/containers/electronic/entities/electronic.entity";
import { SinisterEntity } from "src/containers/sinister/entities/sinister.entity";
import { UserEntity } from "src/containers/user/entities/user.entity";
import { VehicleEntity } from "src/containers/vehicle/entities/vehicle.entity";
import { Entity, ManyToOne, OneToOne, JoinColumn, OneToMany, Column } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'assets' })
export class AssetEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (users) => users.assets)
  user: string;

  @OneToOne(() => VehicleEntity)
  @JoinColumn()
  vehicle: string;

  @OneToOne(() => ElectronicEntity)
  @JoinColumn()
  electronic: string;

  @ManyToOne(() => UserEntity, (user) => user.brokerAssets)
  @JoinColumn()
  client: string;

  @Column({ default: false })
  insured: boolean;

  @Column({ default: true })
  inspection: boolean;

  @Column({ nullable: true })
  pdf: string;

  @OneToMany(() => SinisterEntity, (sinister) => sinister.asset)
  sinisters: SinisterEntity[];
}
