import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Queue } from './models/queue.model';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';

@Injectable()
export class QueueService {
  constructor(@InjectModel(Queue) private queueRepo: typeof Queue) { }

  async create(createQueueDto: CreateQueueDto) {
    const res = await this.queueRepo.create(createQueueDto);
    return res;
  }

  async findAll() {
    return await this.queueRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.queueRepo.findByPk(id);
  }

  async update(id: number, updateQueueDto: UpdateQueueDto) {
    return await this.queueRepo.update(updateQueueDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.queueRepo.destroy({ where: { id } });
    return result;
  }
}
