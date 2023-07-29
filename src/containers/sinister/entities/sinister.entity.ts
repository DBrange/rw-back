import { BaseEntity } from "../../../config/base.entity";
import { Asset } from "../../../containers/asset/entities/asset.entity";
import { ISinister } from "../../../interfaces/sinister.interface";
import { ThirdPartyVehicle } from "../../../containers/third-party-vehicle/entities/thirdPartyVehicle.entity";
import { Injured } from "../../../containers/injured/entities/injured.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Sinister extends BaseEntity implements ISinister {

     @Column()
     time: Date;

     @Column()
     date: Date;

     @Column()
     location: string;

     @ManyToOne(() => Asset, (asset) => asset.sinister)
     asset: Asset;
     
     @OneToMany(() => ThirdPartyVehicle, (thirdPartyVehicle) => thirdPartyVehicle.sinister)
     thirdPartyVehicle: ThirdPartyVehicle[];

     @OneToMany(() => Injured, (injuredd) => injuredd.sinister)
     injuredd: Injured[]
};