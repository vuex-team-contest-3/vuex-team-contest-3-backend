import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './models/client.model';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client) private clientRepo: typeof Client) {}

  async create(createClientDto: CreateClientDto) {
    const res = await this.clientRepo.create(createClientDto);
    return res;
  }

  async findAll() {
    return await this.clientRepo.findAll({
      include: { all: true, nested: true },
    });
  }

  async findOne(id: number) {
    return await this.clientRepo.findByPk(id);
  }

  async findByLogin(login: string) {
    return await this.clientRepo.findOne({ where: { first_name: login } });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    return await this.clientRepo.update(updateClientDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.clientRepo.destroy({ where: { id } });
    return result;
  }
}
