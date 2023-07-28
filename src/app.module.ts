import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { DataSourceConfig } from './config/dataSource';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : `.${process.env.NODE_ENV}.env`,
      isGlobal : true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
  ],
})
export class AppModule {}