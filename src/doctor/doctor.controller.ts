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
        },
      },
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createDoctorDto: CreateDoctorDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.doctorService.create(createDoctorDto, image);
  }

  @ApiOperation({ summary: 'Get all doctor' })
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @ApiOperation({ summary: 'Get doctor' })
  @Get(':id')
  findOne(@Param('id') id: number) {
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
