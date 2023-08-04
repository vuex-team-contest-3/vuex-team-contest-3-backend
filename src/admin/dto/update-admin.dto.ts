import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({
    example: 'clinic',
    description: 'The login of the Admin',
  })
  @IsOptional()
  @IsString()
  login?: string;

  @ApiProperty({
    example: 'admin',
    description: 'The password of the Admin',
  })
  @IsOptional()
  @IsString()
  password?: string;
}
