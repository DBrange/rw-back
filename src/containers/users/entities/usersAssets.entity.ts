// import { Column, Entity, ManyToOne } from 'typeorm';
// import { BaseEntity } from '../../../config/base.entity';
// import { ACCESS_LEVEL } from '../../../constants/roles';
// import { UserEntity } from './user.entity';
// import { AssetEntity } from '../../asset/entities/asset.entity';

// @Entity({ name: 'users_asset' })
// export class UsersProjectsEntity extends BaseEntity {
//   @Column({ type: 'enum', enum: ACCESS_LEVEL })
//   accessLevel: ACCESS_LEVEL;

//   @ManyToOne(()=> UserEntity, (user)=> user.asset)
//   user: UserEntity;

//   @ManyToOne(() => AssetEntity, (project)=> project.users)
//   asset: AssetEntity;
//}