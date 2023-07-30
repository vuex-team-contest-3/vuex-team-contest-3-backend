import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { Service } from './models/service.model';

@Module({
  imports: [SequelizeModule.forFeature([Service]), JwtModule],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
