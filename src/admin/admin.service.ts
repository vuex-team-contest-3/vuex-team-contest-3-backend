import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAdminDto: LoginAdminDto) {
    try {
      const { login, password } = loginAdminDto;
      const adminByLogin = await this.getAdminByLogin(login);
      if (!adminByLogin) {
        throw new UnauthorizedException('Login or password is wrong');
      }
      const isMatchPass = await compare(password, adminByLogin.hashed_password);
      if (!isMatchPass) {
        throw new UnauthorizedException('Login or password is wrong');
      }
      const token = await this.getToken(adminByLogin);
      const admin = await this.getOne(adminByLogin.id);
      const response = {
        token,
        admin,
      };
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(createAdminDto: CreateAdminDto) {
    const res = await this.adminRepo.create(createAdminDto);
    return res;
  }

  async findAll() {
    return await this.adminRepo.findAll({
      include: { all: true, nested: true },
    });
  }

  async findOne(id: number) {
    return await this.adminRepo.findByPk(id);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return await this.adminRepo.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.adminRepo.destroy({ where: { id } });
    return result;
  }

  async getOne(id: number) {
    try {
      const admin = await this.adminRepo.findOne({
        where: { id },
        attributes: ['id', 'login'],
      });
      if (!admin) {
        throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
      }
      return admin;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAdminByLogin(login: string) {
    try {
      const admin = await this.adminRepo.findOne({
        where: { login },
        attributes: ['id', 'login', 'hashed_password'],
      });
      return admin;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getToken(admin: Admin) {
    try {
      const jwtPayload = {
        id: admin.id,
        login: admin.login,
      };
      const token = await this.jwtService.signAsync(jwtPayload, {
        secret: process.env.TOKEN_KEY,
        expiresIn: process.env.TOKEN_TIME,
      });
      return token;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
