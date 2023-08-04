import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    example: 'clinic',
    description: 'The login of the Admin',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    example: 'admin',
    description: 'The password of the Admin',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
