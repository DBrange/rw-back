import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { ClientEntity } from './entities/client.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ClientEntity, UserEntity])],
    controllers: [ClientController],
    providers: [ClientService]
})
export class ClientModule {}
