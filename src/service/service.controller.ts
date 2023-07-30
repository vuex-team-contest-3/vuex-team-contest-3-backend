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
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceService } from './service.service';

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @ApiOperation({ summary: 'Create a service' })
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @ApiOperation({ summary: 'Get all service' })
  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @ApiOperation({ summary: 'Get service' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.serviceService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update service' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return await this.serviceService.update(+id, updateServiceDto);
  }

  @ApiOperation({ summary: 'Delete service' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.serviceService.delete(id);
  }
}
