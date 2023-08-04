import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { LoginDto } from './dto/login-user.dto';
import { Response } from 'express';
import { AdminService } from '../admin/admin.service';
import { CreateClientDto } from '../client/dto/create-client.dto';
import { ClientService } from '../client/client.service';
import { DoctorService } from '../doctor/doctor.service';
import { LoginAdminDto } from '../admin/dto/login-admin.dto';
import { LoginDoctorDto } from '../doctor/dto/login-doctor.dto';

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
    console.log(password, adminByLogin.hashed_password);
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

  async userRegister(createClientDto: CreateClientDto, res: Response) {
    const user = await this.clientService.create(createClientDto);
    const { token } = await this.getToken(user.id, 'USER');
    return { msg: 'USER REGISTERED', user, token };
  }

  async userLogin(loginDto: LoginDto, res: Response) {
    const { login, password } = loginDto;
    const user = await this.clientService.findByLogin(login);
    if (!user || user.phone != password) {
      throw new HttpException(
        `Bunday foydalanuvchi mavjud emas`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const { token } = await this.getToken(user.id, 'USER');
    return { msg: 'USER LOGGED', user, token };
  }

  async getToken(id: any, role: string) {
    const payload = { id: id, role: role };
    const accessToken = this.jwtService.signAsync(payload, {
      secret: process.env.TOKEN_KEY,
      expiresIn: process.env.TOKEN_TIME,
    });
    return { token: accessToken };
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
