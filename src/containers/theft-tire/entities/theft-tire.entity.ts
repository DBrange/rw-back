import { TheftEntity } from "src/containers/theft/entities/theft.entity";
import { ITheftTire } from "src/interfaces/theftTire";
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'thefts_tire' })
export class TheftTireEntity extends BaseEntity implements ITheftTire {
  @Column()
  tireAmount: number;

  @Column()
  tireWear: number;

  @Column({ array: true })
  tirePhoto: string;

  @Column()
  replacementLocation: string;

  @OneToOne(() => TheftEntity)
  @JoinColumn()
  theft: string;
}
