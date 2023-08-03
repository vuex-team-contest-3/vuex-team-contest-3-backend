import { IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  readonly login: string;

  @ApiProperty({ example: 'admin' })
  readonly password: string;
}
