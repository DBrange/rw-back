import { Fire } from "../../../containers/fire/entities/fire.entity";
import { BaseEntity } from "../../../config/base.entity";
import { Crash } from "../../../containers/crash/entities/crash.entity";
import { Entity, JoinColumn, OneToOne } from "typeorm";
import { Damage } from "../../../containers/damage/entities/damage.entity";
import { Theft } from "../../../containers/theft/entities/theft.entity";
import { Sinister } from "../../../containers/sinister/entities/sinister.entity";

@Entity('sinister_type')
export class SinisterType extends BaseEntity {

     @OneToOne(() => Crash)
     @JoinColumn()
     crash: Crash;

     @OneToOne(() => Fire)
     @JoinColumn()
     fire: Fire;

     @OneToOne(() => Damage)
     @JoinColumn()
     damage: Damage;

     @OneToOne(() => Theft)
     @JoinColumn()
     theft: Theft;

     @OneToOne(() => Sinister) 
     @JoinColumn()
     sinister: Sinister;

};