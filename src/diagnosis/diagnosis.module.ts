import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { DiagnosisController } from './diagnosis.controller';
import { DiagnosisService } from './diagnosis.service';
import { Diagnosis } from './models/diagnosis.model';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Diagnosis]),
    forwardRef(() => ServiceModule),
  ],
  controllers: [DiagnosisController],
  providers: [DiagnosisService],
  exports: [DiagnosisService],
})
export class DiagnosisModule {}
