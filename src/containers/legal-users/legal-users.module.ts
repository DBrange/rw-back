import { Module } from '@nestjs/common';
import { LegalUsersController } from './legal-users.controller';
import { LegalUsersService } from './legal-users.service';

@Module({
  controllers: [LegalUsersController],
  providers: [LegalUsersService]
})
export class LegalUsersModule {}
