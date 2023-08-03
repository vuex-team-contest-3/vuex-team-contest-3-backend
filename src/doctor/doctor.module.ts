import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { Doctor } from './models/doctor.model';
import { ImageModule } from '../image/image.module';
import { ClinicModule } from '../clinic/clinic.module';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Doctor]),
    forwardRef(() => ClinicModule),
    forwardRef(() => ServiceModule),
    forwardRef(() => ImageModule),
    JwtModule,
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}
