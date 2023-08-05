import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Queue } from './models/queue.model';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { Op } from 'sequelize';
import { Client } from '../client/models/client.model';
import { Diagnosis } from '../diagnosis/models/diagnosis.model';
import { Doctor } from '../doctor/models/doctor.model';
import { ImageService } from '../image/image.service';
import { ClientService } from './../client/client.service';
import { DoctorService } from './../doctor/doctor.service';
import { DiagnosisService } from './../diagnosis/diagnosis.service';

@Injectable()
export class QueueService {
  constructor(
    @InjectModel(Queue) private queueRepo: typeof Queue,
    private readonly clientService: ClientService,
    private readonly doctorService: DoctorService,
    private readonly diagnosisService: DiagnosisService,
    private readonly imageService: ImageService,
  ) {}

  async create(createQueueDto: CreateQueueDto) {
    await this.clientService.getOne(createQueueDto.client_id);
    await this.doctorService.getOne(createQueueDto.doctor_id);

    const checkClient = await this.checkClient(createQueueDto);
    if (checkClient) {
      throw new BadRequestException('Queue taken before!');
    }

    const queue = await this.queueRepo.create({
      is_active: true,
      ...createQueueDto,
    });
    return this.getOne(queue.id);
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
          attributes: ['id', 'first_name', 'last_name', 'age', 'phone'],
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
          attributes: ['id', 'first_name', 'last_name', 'age', 'phone'],
        },
        {
          model: Diagnosis,
          attributes: ['id', 'name'],
        },
      ],
    });
  }

  async findOne(id: number) {
    return this.getOne(id);
  }

  async update(
    id: number,
    updateQueueDto: UpdateQueueDto,
    image: Express.Multer.File,
  ) {
    const queue = await this.getOne(id);

    if (updateQueueDto.diagnosis_id) {
      await this.diagnosisService.getOne(updateQueueDto.diagnosis_id);
    }

    if (image) {
      if (queue.image_name) {
        await this.queueRepo.update({ image_name: null }, { where: { id } });
        await this.imageService.remove(queue.image_name);
      }
      const fileName = await this.imageService.create(image);
      await this.queueRepo.update({ image_name: fileName }, { where: { id } });
    }

    await this.queueRepo.update(updateQueueDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async delete(id: number) {
    const queue = await this.getOne(id);
    if (
      queue.is_active == true &&
      queue.started_at == null &&
      queue.finished_at == null
    ) {
      await this.queueRepo.destroy({ where: { id } });
      if (queue.image_name) {
        await this.imageService.remove(queue.image_name);
      }
      return queue;
    } else {
      throw new BadRequestException('Queue is used!');
    }
  }

  async getOne(id: number) {
    const queue = await this.queueRepo.findOne({
      where: { id },
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
          attributes: ['id', 'first_name', 'last_name', 'age', 'phone'],
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
    if (!queue) {
      throw new HttpException('Queue not found', HttpStatus.NOT_FOUND);
    }
    return queue;
  }

  async checkClient(createQueueDto: CreateQueueDto) {
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

    const queue = await this.queueRepo.findOne({
      where: {
        ...createQueueDto,
        is_active: true,
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
          attributes: ['id', 'first_name', 'last_name', 'age', 'phone'],
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
    return queue ? queue : false;
  }
}
