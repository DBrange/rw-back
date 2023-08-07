import { Module } from '@nestjs/common';
import { LegalUsersController } from './legal-users.controller';
import { LegalUsersService } from './legal-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegalUsers } from './entities/legalUsers.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LegalUsers])],
  controllers: [LegalUsersController],
  providers: [LegalUsersService]
})
export class LegalUsersModule {}
