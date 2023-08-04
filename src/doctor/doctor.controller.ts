import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorService } from './doctor.service';
import { LoginDoctorDto } from './dto/login-doctor.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from '../pipes/image-validation.pipe';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiOperation({ summary: 'Login Doctor' })
  @Post('signin')
  async login(@Body() loginDoctorDto: LoginDoctorDto) {
    return this.doctorService.login(loginDoctorDto);
  }

  @ApiOperation({ summary: 'Create a doctor' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Image file to upload',
        },
        first_name: {
          type: 'string',
          example: 'John',
          description: 'The first name of the Doctor',
        },
        last_name: {
          type: 'string',
          example: 'Doe',
          description: 'The last name of the Doctor',
        },
        phone: {
          type: 'string',
          example: '+998991234657',
          description: 'The phone of the Doctor',
        },
        profession: {
          type: 'string',
          example: 'Dentist',
          description: 'The profession of the Doctor',
        },
        experience: {
          type: 'string',
          example: '6 years',
          description: 'The experience of the Doctor',
        },
        work_time: {
          type: 'string',
          example: '8:00-12:00',
          description: 'The work time of the Doctor',
        },
        work_day: {
          type: 'string',
          example: 'Monday,Tuesday,Friday',
          description: 'The work day of the Doctor',
        },
        floor: {
          type: 'string',
          example: '3',
          description: 'The floor of the Doctor`s room',
        },
        room: {
          type: 'string',
          example: '17-a',
          description: 'The room of the Doctor',
        },
        service_id: {
          type: 'number',
          example: 3,
          description: 'The service ID of the Doctor',
        },
        clinic_id: {
          type: 'number',
          example: 4,
          description: 'The clinic ID of the Doctor',
        },
      },
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createDoctorDto: CreateDoctorDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.doctorService.create(createDoctorDto, image);
  }

  @ApiOperation({ summary: 'Get all doctor' })
  @Get()
  async findAll() {
    return this.doctorService.findAll();
  }

  @ApiOperation({ summary: 'Get doctor' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.doctorService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update doctor' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Image file to upload',
        },
        first_name: {
          type: 'string',
          example: 'John',
          description: 'The first name of the Doctor',
        },
        last_name: {
          type: 'string',
          example: 'Doe',
          description: 'The last name of the Doctor',
        },
        phone: {
          type: 'string',
          example: '+998991234657',
          description: 'The phone of the Doctor',
        },
        profession: {
          type: 'string',
          example: 'Dentist',
          description: 'The profession of the Doctor',
        },
        experience: {
          type: 'string',
          example: '6 years',
          description: 'The experience of the Doctor',
        },
        work_time: {
          type: 'string',
          example: '8:00-12:00',
          description: 'The work time of the Doctor',
        },
        work_day: {
          type: 'string',
          example: 'Monday,Tuesday,Friday',
          description: 'The work day of the Doctor',
        },
        floor: {
          type: 'string',
          example: '3',
          description: 'The floor of the Doctor`s room',
        },
        room: {
          type: 'string',
          example: '17-a',
          description: 'The room of the Doctor',
        },
        service_id: {
          type: 'number',
          example: 3,
          description: 'The service ID of the Doctor',
        },
        clinic_id: {
          type: 'number',
          example: 4,
          description: 'The clinic ID of the Doctor',
        },
      },
    },
  })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() updateDoctorDto: UpdateDoctorDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.doctorService.update(+id, updateDoctorDto, image);
  }

  @ApiOperation({ summary: 'Delete doctor' })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.doctorService.delete(id);
  }
}
