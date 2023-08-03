import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ClinicModule } from './clinic/clinic.module';
import { join } from 'path';
import { ServiceModule } from './service/service.module';
import { Service } from './service/models/service.model';
import { Admin } from './admin/models/admin.model';
import { Client } from './client/models/client.model';
import { Clinic } from './clinic/models/clinic.model';
import { Diagnosis } from './diagnosis/models/diagnosis.model';
import { Doctor } from './doctor/models/doctor.model';
import { Queue } from './queue/models/queue.model';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { DoctorModule } from './doctor/doctor.module';
import { QueueModule } from './queue/queue.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: String(process.env.PG_PASSWORD),
      database: process.env.PG_DB,
      models: [Admin, Service, Client, Clinic, Diagnosis, Doctor, Queue],
      autoLoadModels: true,
      logging: false,
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
    AuthModule,
    AdminModule,
    ServiceModule,
    ClientModule,
    ClinicModule,
    DiagnosisModule,
    DoctorModule,
    QueueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
