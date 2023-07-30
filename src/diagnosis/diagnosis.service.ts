import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Diagnosis } from './models/diagnosis.model';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';

@Injectable()
export class DiagnosisService {
  constructor(@InjectModel(Diagnosis) private diagnosisRepo: typeof Diagnosis) { }

  async create(createDiagnosisDto: CreateDiagnosisDto) {
    const res = await this.diagnosisRepo.create(createDiagnosisDto);
    return res;
  }

  async findAll() {
    return await this.diagnosisRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.diagnosisRepo.findByPk(id);
  }

  async update(id: number, updateDiagnosisDto: UpdateDiagnosisDto) {
    return await this.diagnosisRepo.update(updateDiagnosisDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.diagnosisRepo.destroy({ where: { id } });
    return result;
  }
}
