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
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientService } from './client.service';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Create a client' })
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @ApiOperation({ summary: 'Get all client' })
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @ApiOperation({ summary: 'Get client' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update client' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientService.update(+id, updateClientDto);
  }

  @ApiOperation({ summary: 'Delete client' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.clientService.delete(id);
  }
}