import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { Queue } from './models/queue.model';
import { ImageModule } from '../image/image.module';
import { ClientModule } from '../client/client.module';
import { DoctorModule } from '../doctor/doctor.module';
import { DiagnosisModule } from '../diagnosis/diagnosis.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Queue]),
    forwardRef(() => ClientModule),
    forwardRef(() => DoctorModule),
    forwardRef(() => DiagnosisModule),
    forwardRef(() => ImageModule),
    JwtModule,
  ],
  controllers: [QueueController],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
