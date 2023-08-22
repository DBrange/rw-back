import { BaseEntity } from 'src/config/base.entity';
import { Theft } from 'src/containers/theft/entities/theft.entity';
import { ITheftTire } from 'src/interfaces/theftTire';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class TheftTire extends BaseEntity implements ITheftTire {
  @Column()
  tireAmount: number;

  @Column()
  tireWear: number;

  @OneToOne(() => Theft)
  @JoinColumn()
  theft: Theft;
}
