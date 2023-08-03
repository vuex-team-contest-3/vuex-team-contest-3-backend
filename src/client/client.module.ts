import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Client } from './models/client.model';

@Module({
  imports: [SequelizeModule.forFeature([Client]), JwtModule],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
