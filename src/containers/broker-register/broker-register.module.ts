import { Module } from '@nestjs/common';
import { BrokerRegisterController } from './controllers/broker-register.controller';
import { BrokerRegisterService } from './broker-register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrokerRegister } from './entities/broker-register.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BrokerRegister])],
    controllers: [BrokerRegisterController],
    providers: [BrokerRegisterService]
})
export class BrokerRegisterModule {}

