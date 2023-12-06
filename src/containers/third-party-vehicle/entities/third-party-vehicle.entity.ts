import { SinisterEntity } from "src/containers/sinister/entities/sinister.entity";
import { ThirdPartyDriverEntity } from "src/containers/third-party-driver/entities/third-party-driver.entity";
import { IThirdPartyVehicle } from "src/interfaces/thirdPartyVehicle.interface";
import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'third_party_vehicles' })
export class ThirdPartyVehicleEntity
  extends BaseEntity
  implements IThirdPartyVehicle
{
  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  plate: string;

  @Column()
  insuranceCompany: string;

  @Column()
  insurancePolicy: string;

  @Column()
  ownerName: string;

  @Column()
  ownerLastName: string;

  @Column()
  ownerDni: string;

  @OneToOne(() => ThirdPartyDriverEntity)
  @JoinColumn()
  thirdPartyDriver: string;

  @ManyToOne(() => SinisterEntity, (sinister) => sinister.thirdPartyVehicle)
  sinister: string;
};