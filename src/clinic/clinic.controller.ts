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
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { ClinicService } from './clinic.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from '../pipes/image-validation.pipe';

@ApiTags('Clinic')
@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @ApiOperation({ summary: 'Create a clinic' })
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
        name: {
          type: 'string',
          example: 'ShifoMed',
          description: 'The name of the Clinic',
        },
        address: {
          type: 'string',
          example: 'Yunusobod, Toshkent',
          description: 'The address of the Clinic',
        },
        phone: {
          type: 'string',
          example: '+998991234657',
          description: 'The phone number of the Clinic',
        },
      },
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createClinicDto: CreateClinicDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.clinicService.create(createClinicDto, image);
  }

  @ApiOperation({ summary: 'Get all clinic' })
  @Get()
  async findAll() {
    return this.clinicService.findAll();
  }

  @ApiOperation({ summary: 'Get clinic' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.clinicService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update clinic' })
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
        name: {
          type: 'string',
          example: 'ShifoMed',
          description: 'The name of the Clinic',
        },
        address: {
          type: 'string',
          example: 'Yunusobod, Toshkent',
          description: 'The address of the Clinic',
        },
        phone: {
          type: 'string',
          example: '+998991234657',
          description: 'The phone number of the Clinic',
        },
      },
    },
  })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() updateClinicDto: UpdateClinicDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.clinicService.update(+id, updateClinicDto, image);
  }

  @ApiOperation({ summary: 'Delete clinic' })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.clinicService.delete(id);
  }
}
