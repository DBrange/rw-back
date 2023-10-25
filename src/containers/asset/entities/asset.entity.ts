import { Sinister } from '../../../containers/sinister/entities/sinister.entity';
import { BaseEntity } from '../../../config/base.entity';
import { Electronics } from '../../../containers/electronics/entities/electronics.entity';
import { LegalUsers } from '../../../containers/legal-users/entities/legalUsers.entity';
import { UserEntity } from '../../../containers/users/entities/user.entity';
import { Vehicle } from '../../../containers/vehicle/entities/vehicle.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'asset' })
export class AssetEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (users) => users.asset)
  users: UserEntity;

  @ManyToOne(() => LegalUsers, (legalUsers) => legalUsers.asset)
  legalUsers: LegalUsers;

  @OneToOne(() => Vehicle)
  @JoinColumn()
  vehicle: Vehicle;

  @OneToOne(() => Electronics)
  @JoinColumn()
  electronics: Electronics;

  @OneToMany(() => Sinister, (sinister) => sinister.asset)
  sinister: Sinister[];
}
