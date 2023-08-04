import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.model';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { LoginDoctorDto } from './dto/login-doctor.dto';
import { Service } from '../service/models/service.model';
import { Clinic } from '../clinic/models/clinic.model';
import { JwtService } from '@nestjs/jwt';
import { ImageService } from '../image/image.service';
import { ClinicService } from './../clinic/clinic.service';
import { ServiceService } from './../service/service.service';
import { QueueService } from './../queue/queue.service';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor) private doctorRepo: typeof Doctor,
    private readonly jwtService: JwtService,
    private readonly clinicService: ClinicService,
    private readonly serviceService: ServiceService,
    private readonly imageService: ImageService,
  ) {}

  async login(loginDoctorDto: LoginDoctorDto) {
    const { login, password } = loginDoctorDto;
    const doctorByPhone = await this.getDoctorByPhone(password);

    if (!doctorByPhone) {
      throw new UnauthorizedException('Login or password is wrong');
    }

    if (doctorByPhone.clinic.id != login) {
      throw new UnauthorizedException('Login or password is wrong');
    }
    const token = await this.getToken(doctorByPhone);
    const doctor = await this.getOne(doctorByPhone.id);
    const response = {
      token,
      doctor,
    };
    return response;
  }

  async create(createDoctorDto: CreateDoctorDto, image: Express.Multer.File) {
    await this.clinicService.getOne(createDoctorDto.clinic_id);
    await this.serviceService.getOne(createDoctorDto.service_id);

    const doctorByPhone = await this.getDoctorByPhone(createDoctorDto.phone);
    if (doctorByPhone) {
      throw new BadRequestException('Phone already registered!');
    }

    let fileName = null;
    if (image) fileName = await this.imageService.create(image);

    const doctor = await this.doctorRepo.create({
      ...createDoctorDto,
      image_name: fileName,
    });
    return this.getOne(doctor.id);
  }

  async findAll() {
    return this.doctorRepo.findAll({
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
      include: [
        {
          model: Service,
          attributes: ['id', 'name', 'price'],
        },
        {
          model: Clinic,
          attributes: ['id', 'name', 'address', 'phone', 'image_name'],
        },
      ],
    });
  }

  async findOne(id: number) {
    return this.getOne(id);
  }

  async update(
    id: number,
    updateDoctorDto: UpdateDoctorDto,
    image: Express.Multer.File,
  ) {
    const doctor = await this.getOne(id);

    if (updateDoctorDto.service_id) {
      await this.serviceService.getOne(updateDoctorDto.service_id);
    }

    if (updateDoctorDto.phone) {
      const doctorByPhone = await this.getDoctorByPhone(updateDoctorDto.phone);
      if (doctorByPhone && doctorByPhone.id != id) {
        throw new BadRequestException('Phone already registered!');
      }
    }

    if (image) {
      if (doctor.image_name) {
        await this.doctorRepo.update({ image_name: null }, { where: { id } });
        await this.imageService.remove(doctor.image_name);
      }
      const fileName = await this.imageService.create(image);
      await this.doctorRepo.update({ image_name: fileName }, { where: { id } });
    }

    await this.doctorRepo.update(updateDoctorDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async delete(id: number) {
    const doctor = await this.getOne(id);
    await this.doctorRepo.destroy({ where: { id } });
    if (doctor.image_name) {
      await this.imageService.remove(doctor.image_name);
    }
    return doctor;
  }

  async getOne(id: number) {
    const doctor = await this.doctorRepo.findOne({
      where: { id },
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
      include: [
        {
          model: Service,
          attributes: ['id', 'name', 'price'],
        },
        {
          model: Clinic,
          attributes: ['id', 'name', 'address', 'phone', 'image_name'],
        },
      ],
    });
    if (!doctor) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }
    return doctor;
  }

  async getDoctorByLogin(login: number) {
    const doctor = await this.doctorRepo.findOne({
      where: { clinic_id: login },
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
      include: [
        {
          model: Service,
          attributes: ['id', 'name', 'price'],
        },
        {
          model: Clinic,
          attributes: ['id', 'name', 'address', 'phone', 'image_name'],
        },
      ],
    });
    return doctor;
  }

  async getDoctorByPhone(phone: string) {
    const doctor = await this.doctorRepo.findOne({
      where: { phone },
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
      include: [
        {
          model: Service,
          attributes: ['id', 'name', 'price'],
        },
        {
          model: Clinic,
          attributes: ['id', 'name', 'address', 'phone', 'image_name'],
        },
      ],
    });
    return doctor;
  }

  async getToken(doctor: Doctor) {
    try {
      const jwtPayload = {
        id: doctor.id,
        login: doctor.clinic_id,
        phone: doctor.phone,
        role: 'DOCTOR',
      };
      const token = await this.jwtService.signAsync(jwtPayload, {
        secret: process.env.TOKEN_KEY,
        expiresIn: process.env.TOKEN_TIME,
      });
      return token;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
