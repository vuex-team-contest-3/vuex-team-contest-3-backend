import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.model';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor) private doctorRepo: typeof Doctor) { }

  async create(createDoctorDto: CreateDoctorDto) {
    const res = await this.doctorRepo.create(createDoctorDto);
    return res;
  }

  async findAll() {
    return await this.doctorRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.doctorRepo.findByPk(id);
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return await this.doctorRepo.update(updateDoctorDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.doctorRepo.destroy({ where: { id } });
    return result;
  }
}
