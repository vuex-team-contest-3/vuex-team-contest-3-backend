import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './models/client.model';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Queue } from '../queue/models/queue.model';
import { Doctor } from '../doctor/models/doctor.model';
import { Diagnosis } from '../diagnosis/models/diagnosis.model';
import { Service } from '../service/models/service.model';
import { Clinic } from '../clinic/models/clinic.model';
import { LoginClientDto } from './dto/login-client.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client) private clientRepo: typeof Client,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginClientDto: LoginClientDto) {
    const { login, password } = loginClientDto;
    const clientByPhone = await this.getClientByPhone(password);

    if (!clientByPhone) {
      throw new UnauthorizedException('Login or password is wrong');
    }

    if (clientByPhone.first_name != login) {
      throw new UnauthorizedException('Login or password is wrong');
    }
    const token = await this.getToken(clientByPhone);
    const client = await this.getOne(clientByPhone.id);
    const response = {
      token,
      client,
    };
    return response;
  }

  async create(createClientDto: CreateClientDto) {
    const clientByPhone = await this.getClientByPhone(createClientDto.phone);
    if (clientByPhone) {
      throw new BadRequestException('Phone already registered!');
    }

    const client = await this.clientRepo.create(createClientDto);
    return this.getOne(client.id);
  }

  async findAll() {
    return this.clientRepo.findAll({
      attributes: ['id', 'first_name', 'last_name', 'age', 'phone'],
      include: [
        {
          model: Queue,
          attributes: [
            'id',
            'is_active',
            'started_at',
            'finished_at',
            'image_name',
            'createdAt',
          ],
          include: [
            {
              model: Diagnosis,
              attributes: ['id', 'name'],
            },
            {
              model: Doctor,
              attributes: [
                'id',
                'first_name',
                'last_name',
                'phone',
                'profession',
                'experience',
                'work_time',
                'work_day',
                'floor',
                'room',
                'image_name',
              ],
              include: [
                {
                  model: Service,
                  attributes: ['id', 'name', 'price'],
                },
                {
                  model: Clinic,
                  attributes: ['id', 'name', 'address', 'phone', 'image_name'],
                },
              ],
            },
          ],
        },
      ],
    });
  }

  async findOne(id: number) {
    return this.getOne(id);
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    await this.getOne(id);

    if (updateClientDto.phone) {
      const clientByPhone = await this.getClientByPhone(updateClientDto.phone);
      if (clientByPhone && clientByPhone.id != id) {
        throw new BadRequestException('Phone already registered!');
      }
    }

    await this.clientRepo.update(updateClientDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async delete(id: number) {
    const client = await this.getOne(id);
    await this.clientRepo.destroy({ where: { id } });
    return client;
  }

  async getOne(id: number) {
    const client = await this.clientRepo.findOne({
      where: { id },
      attributes: ['id', 'first_name', 'last_name', 'age', 'phone'],
      include: [
        {
          model: Queue,
          attributes: [
            'id',
            'is_active',
            'started_at',
            'finished_at',
            'image_name',
            'createdAt',
          ],
          include: [
            {
              model: Diagnosis,
              attributes: ['id', 'name'],
            },
            {
              model: Doctor,
              attributes: [
                'id',
                'first_name',
                'last_name',
                'phone',
                'profession',
                'experience',
                'work_time',
                'work_day',
                'floor',
                'room',
                'image_name',
              ],
              include: [
                {
                  model: Service,
                  attributes: ['id', 'name', 'price'],
                },
                {
                  model: Clinic,
                  attributes: ['id', 'name', 'address', 'phone', 'image_name'],
                },
              ],
            },
          ],
        },
      ],
    });
    if (!client) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }
    return client;
  }

  async getClientByLogin(login: string) {
    const client = this.clientRepo.findOne({
      where: { first_name: login },
      attributes: ['id', 'first_name', 'last_name', 'age', 'phone'],
    });
    return client;
  }

  async getClientByPhone(phone: string) {
    const client = await this.clientRepo.findOne({
      where: { phone },
      attributes: ['id', 'first_name', 'last_name', 'age', 'phone'],
    });
    return client;
  }

  async getToken(client: Client) {
    try {
      const jwtPayload = {
        id: client.id,
        login: client.first_name,
        phone: client.phone,
        role: 'CLIENT',
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
