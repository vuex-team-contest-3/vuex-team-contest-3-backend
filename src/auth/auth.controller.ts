import { Controller, Post, Body, HttpCode, Res, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateClientDto } from '../client/dto/create-client.dto';
import { LoginAdminDto } from '../admin/dto/login-admin.dto';
import { LoginDoctorDto } from '../doctor/dto/login-doctor.dto';
import { TokenDto } from './dto/token.dto';
import { LoginClientDto } from '../client/dto/login-client.dto';

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
  userRegister(@Body() createClientDto: CreateClientDto) {
    return this.authService.userRegister(createClientDto);
  }

  @ApiOperation({ summary: 'Login User' })
  @HttpCode(200)
  @Post('user/login')
  userLogin(@Body() loginClientDto: LoginClientDto) {
    return this.authService.userLogin(loginClientDto);
  }

  @ApiOperation({ summary: 'Verify Token' })
  @Post('token')
  async verifyToken(@Body() authHeader: TokenDto) {
    return this.authService.verifyToken(authHeader.token);
  }
}
