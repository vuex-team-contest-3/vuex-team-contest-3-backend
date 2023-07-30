import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorService } from './doctor.service';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiOperation({ summary: 'Create a doctor' })
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
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
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return await this.doctorService.update(+id, updateDoctorDto);
  }

  @ApiOperation({ summary: 'Delete doctor' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.doctorService.delete(id);
  }
}
