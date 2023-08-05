import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Response } from 'express';
import { AdminService } from '../admin/admin.service';
import { CreateClientDto } from '../client/dto/create-client.dto';
import { ClientService } from '../client/client.service';
import { DoctorService } from '../doctor/doctor.service';
import { LoginAdminDto } from '../admin/dto/login-admin.dto';
import { LoginDoctorDto } from '../doctor/dto/login-doctor.dto';
import { LoginClientDto } from '../client/dto/login-client.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly clientService: ClientService,
    private readonly doctorService: DoctorService,
    private readonly jwtService: JwtService,
  ) {}

  async adminLogin(loginAdminDto: LoginAdminDto) {
    const { login, password } = loginAdminDto;
    const adminByLogin = await this.adminService.getAdminByLogin(login);
    if (!adminByLogin) {
      throw new UnauthorizedException('Login or password is wrong');
    }
    const isMatchPass = await compare(password, adminByLogin.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Login or password is wrong');
    }
    const token = await this.adminService.getToken(adminByLogin);
    const admin = await this.adminService.getOne(adminByLogin.id);
    const response = {
      msg: 'ADMIN LOGGED',
      token,
      user: admin,
    };
    return response;
  }

  async doctorLogin(loginDoctorDto: LoginDoctorDto) {
    const { login, password } = loginDoctorDto;
    const doctorByPhone = await this.doctorService.getDoctorByPhone(password);

    if (!doctorByPhone) {
      throw new UnauthorizedException('Login or password is wrong');
    }

    if (doctorByPhone.clinic.id != login) {
      throw new UnauthorizedException('Login or password is wrong');
    }
    const token = await this.doctorService.getToken(doctorByPhone);
    const doctor = await this.doctorService.getOne(doctorByPhone.id);
    const response = {
      msg: 'DOCTOR LOGGED',
      token,
      user: doctor,
    };
    return response;
  }

  async userRegister(createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  async userLogin(loginClientDto: LoginClientDto) {
    const { login, password } = loginClientDto;
    const clientByPhone = await this.clientService.getClientByPhone(password);

    if (!clientByPhone) {
      throw new UnauthorizedException('Login or password is wrong');
    }

    if (clientByPhone.first_name != login) {
      throw new UnauthorizedException('Login or password is wrong');
    }
    const token = await this.clientService.getToken(clientByPhone);
    const client = await this.clientService.getOne(clientByPhone.id);
    const response = {
      msg: 'CLIENT LOGGED',
      token,
      user: client,
    };
    return response;
  }

  async verifyToken(authHeader: string) {
    try {
      const token = authHeader;
      const user = await this.jwtService.verify(token, {
        secret: process.env.TOKEN_KEY,
      });
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
