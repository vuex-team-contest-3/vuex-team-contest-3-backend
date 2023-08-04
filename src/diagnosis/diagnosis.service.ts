import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Diagnosis } from './models/diagnosis.model';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { ServiceService } from './../service/service.service';
import { Service } from '../service/models/service.model';

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectModel(Diagnosis) private diagnosisRepo: typeof Diagnosis,
    private readonly serviceService: ServiceService,
  ) {}

  async create(createDiagnosisDto: CreateDiagnosisDto) {
    await this.serviceService.getOne(createDiagnosisDto.service_id);
    const diagnosis = await this.diagnosisRepo.create(createDiagnosisDto);
    return this.getOne(diagnosis.id);
  }

  async findAll() {
    return this.diagnosisRepo.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: Service,
          attributes: ['id', 'name', 'price'],
        },
      ],
    });
  }

  async findOne(id: number) {
    return this.getOne(id);
  }

  async update(id: number, updateDiagnosisDto: UpdateDiagnosisDto) {
    await this.getOne(id);
    await this.diagnosisRepo.update(updateDiagnosisDto, {
      where: { id },
      returning: true,
    });
    return this.getOne(id);
  }

  async delete(id: number) {
    const diagnosis = await this.getOne(id);
    await this.diagnosisRepo.destroy({ where: { id } });
    return diagnosis;
  }

  async getOne(id: number) {
    const diagnosis = await this.diagnosisRepo.findOne({
      where: { id },
      attributes: ['id', 'name'],
      include: [
        {
          model: Service,
          attributes: ['id', 'name', 'price'],
        },
      ],
    });
    if (!diagnosis) {
      throw new HttpException('Diagnosis not found', HttpStatus.NOT_FOUND);
    }
    return diagnosis;
  }
}
