import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './models/service.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(@InjectModel(Service) private serviceRepo: typeof Service) { }

  async create(createServiceDto: CreateServiceDto) {
    const res = await this.serviceRepo.create(createServiceDto);
    return res;
  }

  async findAll() {
    return await this.serviceRepo.findAll({ include: { all: true, nested: true } });
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
}
