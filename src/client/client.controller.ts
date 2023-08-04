import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientService } from './client.service';
import { LoginClientDto } from './dto/login-client.dto';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Login Clint' })
  @Post('signin')
  async login(@Body() loginClintDto: LoginClientDto) {
    return this.clientService.login(loginClintDto);
  }

  @ApiOperation({ summary: 'Create a client' })
  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @ApiOperation({ summary: 'Get all client' })
  @Get()
  async findAll() {
    return this.clientService.findAll();
  }

  @ApiOperation({ summary: 'Get client' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.clientService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update client' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.update(+id, updateClientDto);
  }

  @ApiOperation({ summary: 'Delete client' })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.clientService.delete(id);
  }
}
