import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Clinic } from './models/clinic.model';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { Service } from '../service/models/service.model';
import { Doctor } from '../doctor/models/doctor.model';

@Injectable()
export class ClinicService {
  constructor(@InjectModel(Clinic) private clinicRepo: typeof Clinic) {}

  async create(createClinicDto: CreateClinicDto) {
    const res = await this.clinicRepo.create(createClinicDto);
    return res;
  }

  async findAll() {
    return await this.clinicRepo.findAll({
      include: { all: true, nested: true },
    });
  }

  async findOne(id: number) {
    return await this.clinicRepo.findByPk(id);
  }

  async update(id: number, updateClinicDto: UpdateClinicDto) {
    return await this.clinicRepo.update(updateClinicDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.clinicRepo.destroy({ where: { id } });
    return result;
  }

  async getOne(id: number) {
    try {
      const clinic = await this.clinicRepo.findOne({
        where: { id },
        attributes: ['id', 'name', 'address', 'phone', 'image_name'],
        include: [
          {
            model: Service,
            attributes: ['id', 'name', 'price'],
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
      if (!clinic) {
        throw new HttpException('Clinic not found', HttpStatus.NOT_FOUND);
      }
      return clinic;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
