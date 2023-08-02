import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Clinic } from './models/clinic.model';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';

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
}
