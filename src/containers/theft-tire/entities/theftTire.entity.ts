import { BaseEntity } from '../../../config/base.entity';
import { Theft } from 'src/containers/theft/entities/theft.entity';
import { ITheftTire } from 'src/interfaces/theftTire';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'theft_tire' })
export class TheftTire extends BaseEntity implements ITheftTire {
  @Column()
  tireAmount: number;

  @Column()
  tireWear: number;

  @Column({ array: true })
  tirePhoto: string;

  @Column()
  replacementLocation: string;

  @OneToOne(() => Theft)
  @JoinColumn()
  theft: Theft;
}
