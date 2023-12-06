import { Module } from '@nestjs/common';
import { LegalUserService } from './services/legal-user.service';
import { LegalUserController } from './controllers/legal-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { LegalUserEntity } from './entities/legal-user.entity';

@Module({
  providers: [LegalUserService],
  controllers: [LegalUserController],
  imports: [TypeOrmModule.forFeature([LegalUserEntity])],
  exports: [LegalUserService],
})
export class LegalUserModule {}
