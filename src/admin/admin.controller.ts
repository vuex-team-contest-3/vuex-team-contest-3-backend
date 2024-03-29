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
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminService } from './admin.service';
import { LoginAdminDto } from './dto/login-admin.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Login Admin' })
  @Post('signin')
  async login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.login(loginAdminDto);
  }

  @ApiOperation({ summary: 'Create a admin' })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: 'Get all admin' })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get admin' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update admin' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete admin' })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.adminService.delete(id);
  }
}
