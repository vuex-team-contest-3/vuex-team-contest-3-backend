import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { Doctor } from './models/doctor.model';

@Module({
  imports: [SequelizeModule.forFeature([Doctor]), JwtModule],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
