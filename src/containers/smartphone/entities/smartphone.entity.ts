import { BaseEntity } from "src/config/base.entity";
import { ElectronicEntity } from "src/containers/electronic/entities/electronic.entity";
import { ISmartphone } from "src/interfaces/smartphone.interface";
import { Entity, Column, OneToOne } from "typeorm";

@Entity({ name: 'smartphones' })
export class SmartphoneEntity extends BaseEntity implements ISmartphone {
  @Column({ unique: true })
  imei: string;

  @Column()
  phoneNumber: string;

  @Column()
  phoneService: string;

  @OneToOne(() => ElectronicEntity, (electronic) => electronic.smartphone)
  electronic: string;
};
