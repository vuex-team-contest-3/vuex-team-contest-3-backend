import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-user.dto';
import { Response } from 'express';
import { AdminService } from '../admin/admin.service';
import { CreateClientDto } from '../client/dto/create-client.dto';
import { ClientService } from '../client/client.service';
import { DoctorService } from '../doctor/doctor.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly clientService: ClientService,
    private readonly doctorService: DoctorService,
    private readonly jwtService: JwtService,
  ) {}

  async adminLogin(loginDto: LoginDto, res: Response) {
    const { login, password } = loginDto;
    const user = await this.adminService.findByLogin(login);
    if (!user || user.password != password) {
      throw new HttpException(
        `Bunday admin mavjud emas`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const { token } = await this.getToken(user.id, 'ADMIN');
    return { msg: 'ADMIN LOGGED', user, token };
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
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });
    return { token: accessToken };
  }
}
