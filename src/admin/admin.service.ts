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
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAdminDto: LoginAdminDto) {
    const { login, password } = loginAdminDto;
    const adminByLogin = await this.getAdminByLogin(login);
    if (!adminByLogin) {
      throw new UnauthorizedException('Login or password is wrong');
    }
    console.log(password, adminByLogin.hashed_password);
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
  }

  async create(createAdminDto: CreateAdminDto) {
    const adminByLogin = await this.getAdminByLogin(createAdminDto.login);
    if (adminByLogin) {
      throw new BadRequestException('Login already registered!');
    }
    const hashed_password = await hash(createAdminDto.password, 7);
    const admin = await this.adminRepo.create({
      ...createAdminDto,
      hashed_password,
    });
    return this.getOne(admin.id);
  }

  async findAll() {
    return this.adminRepo.findAll({
      attributes: ['id', 'login'],
    });
  }

  async findOne(id: number) {
    return this.getOne(id);
  }

  async findByLogin(login: string) {
    return await this.adminRepo.findOne({ where: { login: login } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    await this.getOne(id);

    if (updateAdminDto.login) {
      const adminByLogin = await this.getAdminByLogin(updateAdminDto.login);
      if (adminByLogin && adminByLogin.id != id) {
        throw new BadRequestException('Login already registered!');
      }
    }

    if (updateAdminDto.password) {
      const hashed_password = await hash(updateAdminDto.password, 7);
      await this.adminRepo.update({ hashed_password }, { where: { id } });
    }

    await this.adminRepo.update(updateAdminDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async delete(id: number) {
    const admin = await this.getOne(id);
    await this.adminRepo.destroy({ where: { id } });
    return admin;
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
        role: 'ADMIN',
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
