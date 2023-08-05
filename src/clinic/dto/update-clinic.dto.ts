import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsPhoneNumber } from 'class-validator';

export class UpdateClinicDto {
  @ApiProperty({
    example: 'ShifoMed',
    description: 'The name of the Clinic',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Yunusobod, Toshkent',
    description: 'The address of the Clinic',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: '+998991234567',
    description: 'The phone number of the Clinic',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
