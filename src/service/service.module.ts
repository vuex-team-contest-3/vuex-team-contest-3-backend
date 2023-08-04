import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { Service } from './models/service.model';
import { ClinicModule } from '../clinic/clinic.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Service]),
    forwardRef(() => ClinicModule),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
