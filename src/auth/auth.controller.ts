import {
  Controller,
  Post,
  Body,
  HttpCode,
  Res,
  Headers,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateClientDto } from '../client/dto/create-client.dto';
import { LoginAdminDto } from '../admin/dto/login-admin.dto';
import { LoginDoctorDto } from '../doctor/dto/login-doctor.dto';
import { TokenDto } from './dto/token.dto';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login Admin' })
  @HttpCode(200)
  @Post('admin/login')
  async adminLogin(@Body() loginAdminDto: LoginAdminDto) {
    return this.authService.adminLogin(loginAdminDto);
  }

  @ApiOperation({ summary: 'Login Doctor' })
  @HttpCode(200)
  @Post('doctor/login')
  async login(@Body() loginDoctorDto: LoginDoctorDto) {
    return this.authService.doctorLogin(loginDoctorDto);
  }

  @ApiOperation({ summary: 'Register User' })
  @HttpCode(200)
  @Post('user/register')
  userRegister(
    @Body() createClientDto: CreateClientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.userRegister(createClientDto, res);
  }

  @ApiOperation({ summary: 'Login User' })
  @HttpCode(200)
  @Post('user/login')
  userLogin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.userLogin(loginDto, res);
  }

  @ApiOperation({ summary: 'Verify Token' })
  @Post()
  async verifyToken(@Body() authHeader: TokenDto) {
    return this.authService.verifyToken(authHeader.token);
  }
}
