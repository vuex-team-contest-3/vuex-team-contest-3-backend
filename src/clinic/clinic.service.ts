import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Clinic } from './models/clinic.model';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { Service } from '../service/models/service.model';
import { Doctor } from '../doctor/models/doctor.model';
import { ImageService } from '../image/image.service';
import { Diagnosis } from '../diagnosis/models/diagnosis.model';

@Injectable()
export class ClinicService {
  constructor(
    @InjectModel(Clinic) private clinicRepo: typeof Clinic,
    private readonly imageService: ImageService,
  ) {}

  async create(createClinicDto: CreateClinicDto, image: Express.Multer.File) {
    const clinicByPhone = await this.getClinicByPhone(createClinicDto.phone);
    if (clinicByPhone) {
      throw new BadRequestException('Phone already registered!');
    }

    let fileName = null;
    if (image) fileName = await this.imageService.create(image);

    const clinic = await this.clinicRepo.create({
      ...createClinicDto,
      image_name: fileName,
    });
    return this.getOne(clinic.id);
  }

  async findAll() {
    return this.clinicRepo.findAll({
      attributes: ['id', 'name', 'address', 'phone', 'image_name'],
      include: [
        {
          model: Service,
          attributes: ['id', 'name', 'price'],
          include: [
            {
              model: Diagnosis,
              attributes: ['id', 'name'],
            },
          ],
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

  async update(
    id: number,
    updateClinicDto: UpdateClinicDto,
    image: Express.Multer.File,
  ) {
    const clinic = await this.getOne(id);

    if (updateClinicDto.phone) {
      const clinicByPhone = await this.getClinicByPhone(updateClinicDto.phone);
      if (clinicByPhone && clinicByPhone.id != id) {
        throw new BadRequestException('Phone already registered!');
      }
    }

    if (image) {
      if (clinic.image_name) {
        await this.clinicRepo.update({ image_name: null }, { where: { id } });
        await this.imageService.remove(clinic.image_name);
      }
      const fileName = await this.imageService.create(image);
      await this.clinicRepo.update({ image_name: fileName }, { where: { id } });
    }

    await this.clinicRepo.update(updateClinicDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async delete(id: number) {
    const clinic = await this.getOne(id);
    await this.clinicRepo.destroy({ where: { id } });
    if (clinic.image_name) {
      await this.imageService.remove(clinic.image_name);
    }
    return clinic;
  }

  async getOne(id: number) {
    const clinic = await this.clinicRepo.findOne({
      where: { id },
      attributes: ['id', 'name', 'address', 'phone', 'image_name'],
      include: [
        {
          model: Service,
          attributes: ['id', 'name', 'price'],
          include: [
            {
              model: Diagnosis,
              attributes: ['id', 'name'],
            },
          ],
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
    if (!clinic) {
      throw new HttpException('Clinic not found', HttpStatus.NOT_FOUND);
    }
    return clinic;
  }

  async getClinicByPhone(phone: string) {
    const clinic = await this.clinicRepo.findOne({
      where: { phone },
      attributes: ['id', 'name', 'address', 'phone', 'image_name'],
      include: [
        {
          model: Service,
          attributes: ['id', 'name', 'price'],
          include: [
            {
              model: Diagnosis,
              attributes: ['id', 'name'],
            },
          ],
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
    return clinic;
  }
}
