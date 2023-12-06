import { Module } from '@nestjs/common';
import { PersonalUserService } from './services/personal-user.service';
import { PersonalUserController } from './controller/personal-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { PersonalUserEntity } from './entities/personal.user.entity';

@Module({
  providers: [PersonalUserService],
  controllers: [PersonalUserController],
  imports: [TypeOrmModule.forFeature([PersonalUserEntity])],
  exports: [PersonalUserService],
})
export class PersonalUserModule {}
