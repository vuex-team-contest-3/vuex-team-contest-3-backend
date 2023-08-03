import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateClientDto } from '../client/dto/create-client.dto';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login Admin' })
  @HttpCode(200)
  @Post('admin/login')
  adminLogin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.adminLogin(loginDto, res);
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
}
