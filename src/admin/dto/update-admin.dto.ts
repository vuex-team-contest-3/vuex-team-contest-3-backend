import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({
    example: 'john77',
    description: 'The login of the Admin',
  })
  @IsOptional()
  @IsString()
  login?: string;

  @ApiProperty({
    example: 'Uzbek1&t0n',
    description: 'The password of the Admin',
  })
  @IsOptional()
  @IsString()
  password?: string;
}
