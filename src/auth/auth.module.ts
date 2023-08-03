import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { ClientModule } from '../client/client.module';
import { DoctorModule } from '../doctor/doctor.module';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => ClientModule),
    forwardRef(() => DoctorModule),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule, AdminModule],
})
export class AuthModule {}
