import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Queue } from './models/queue.model';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { Op } from 'sequelize';
import { Client } from '../client/models/client.model';
import { Diagnosis } from '../diagnosis/models/diagnosis.model';

@Injectable()
export class QueueService {
  constructor(@InjectModel(Queue) private queueRepo: typeof Queue) {}

  async create(createQueueDto: CreateQueueDto) {
    const res = await this.queueRepo.create({
      is_active: true,
      ...createQueueDto,
    });
    return res;
  }

  async findAll() {
    return this.queueRepo.findAll({
      attributes: [
        'id',
        'is_active',
        'started_at',
        'finished_at',
        'image_name',
        'createdAt',
      ],
      include: [
        {
          model: Client,
          attributes: ['id', 'fisrt_name', 'last_name', 'age', 'phone'],
        },
        {
          model: Diagnosis,
          attributes: ['id', 'name'],
        },
      ],
    });
  }

  async findAllToday(doctor_id: number) {
    const currentDate = new Date();
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    );

    return this.queueRepo.findAll({
      order: [['createdAt', 'ASC']],
      where: {
        doctor_id,
        createdAt: {
          [Op.gte]: startOfDay,
          [Op.lt]: endOfDay,
        },
      },
      attributes: [
        'id',
        'is_active',
        'started_at',
        'finished_at',
        'image_name',
        'createdAt',
      ],
      include: [
        {
          model: Client,
          attributes: ['id', 'fisrt_name', 'last_name', 'age', 'phone'],
        },
        {
          model: Diagnosis,
          attributes: ['id', 'name'],
        },
      ],
    });
  }

  async findOne(id: number) {
    return this.queueRepo.findByPk(id);
  }

  async update(id: number, updateQueueDto: UpdateQueueDto) {
    return this.queueRepo.update(updateQueueDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.queueRepo.destroy({ where: { id } });
    return result;
  }
}
