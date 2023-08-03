import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './models/service.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Diagnosis } from '../diagnosis/models/diagnosis.model';
import { Clinic } from '../clinic/models/clinic.model';
import { Doctor } from '../doctor/models/doctor.model';

@Injectable()
export class ServiceService {
  constructor(@InjectModel(Service) private serviceRepo: typeof Service) {}

  async create(createServiceDto: CreateServiceDto) {
    const res = await this.serviceRepo.create(createServiceDto);
    return res;
  }

  async findAll() {
    return await this.serviceRepo.findAll({
      include: { all: true, nested: true },
    });
  }

  async findOne(id: number) {
    return await this.serviceRepo.findByPk(id);
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    return await this.serviceRepo.update(updateServiceDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.serviceRepo.destroy({ where: { id } });
    return result;
  }

  async getOne(id: number) {
    try {
      const service = await this.serviceRepo.findOne({
        where: { id },
        attributes: ['id', 'name', 'price'],
        include: [
          {
            model: Clinic,
            attributes: ['id', 'name', 'address', 'phone', 'image_name'],
          },
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
          },
        ],
      });
      if (!service) {
        throw new HttpException('service not found', HttpStatus.NOT_FOUND);
      }
      return service;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
