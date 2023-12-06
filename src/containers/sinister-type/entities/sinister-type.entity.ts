import { CrashEntity } from "src/containers/crash/entities/crash.entity";
import { DamageEntity } from "src/containers/damage/entities/damage.entity";
import { FireEntity } from "src/containers/fire/entities/fire.entity";
import { TheftEntity } from "src/containers/theft/entities/theft.entity";
import { Entity, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity('sinisters_type')
export class SinisterTypeEntity extends BaseEntity {
  @OneToOne(() => CrashEntity)
  @JoinColumn()
  crash: string;

  @OneToOne(() => FireEntity)
  @JoinColumn()
  fire: string;

  @OneToOne(() => DamageEntity)
  @JoinColumn()
  damage: string;

  @OneToOne(() => TheftEntity)
  @JoinColumn()
  theft: string;

  //  @OneToOne(() => Sinister)
  //  @JoinColumn()
  //  sinister: Sinister;
};