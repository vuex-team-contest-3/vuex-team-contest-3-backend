import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { ClinicService } from './clinic.service';

@ApiTags('Clinic')
@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @ApiOperation({ summary: 'Create a clinic' })
  @Post()
  create(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicService.create(createClinicDto);
  }

  @ApiOperation({ summary: 'Get all clinic' })
  @Get()
  findAll() {
    return this.clinicService.findAll();
  }

  @ApiOperation({ summary: 'Get clinic' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clinicService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update clinic' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateClinicDto: UpdateClinicDto,
  ) {
    return await this.clinicService.update(+id, updateClinicDto);
  }

  @ApiOperation({ summary: 'Delete clinic' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.clinicService.delete(id);
  }
}
