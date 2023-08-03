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
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { DiagnosisService } from './diagnosis.service';

@ApiTags('Diagnosis')
@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @ApiOperation({ summary: 'Create a diagnosis' })
  @Post()
  create(@Body() createDiagnosisDto: CreateDiagnosisDto) {
    return this.diagnosisService.create(createDiagnosisDto);
  }

  @ApiOperation({ summary: 'Get all diagnosis' })
  @Get()
  findAll() {
    return this.diagnosisService.findAll();
  }

  @ApiOperation({ summary: 'Get diagnosis' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.diagnosisService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update diagnosis' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDiagnosisDto: UpdateDiagnosisDto,
  ) {
    return await this.diagnosisService.update(+id, updateDiagnosisDto);
  }

  @ApiOperation({ summary: 'Delete diagnosis' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.diagnosisService.delete(id);
  }
}
