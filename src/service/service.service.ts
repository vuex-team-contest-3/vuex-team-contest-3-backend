import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './models/service.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Diagnosis } from '../diagnosis/models/diagnosis.model';
import { Clinic } from '../clinic/models/clinic.model';
import { Doctor } from '../doctor/models/doctor.model';
import { ClinicService } from './../clinic/clinic.service';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service) private serviceRepo: typeof Service,
    // @Inject(forwardRef(() => ClinicService))
    private readonly clinicService: ClinicService,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    await this.clinicService.getOne(createServiceDto.clinic_id);
    const service = await this.serviceRepo.create(createServiceDto);
    return this.getOne(service.id);
  }

  async findAll() {
    return this.serviceRepo.findAll({
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
  }

  async findOne(id: number) {
    return this.getOne(id);
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    await this.getOne(id);
    await this.serviceRepo.update(updateServiceDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async delete(id: number) {
    const service = await this.getOne(id);
    await this.serviceRepo.destroy({ where: { id } });
    return service;
  }

  async getOne(id: number) {
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
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
    return service;
  }
}
