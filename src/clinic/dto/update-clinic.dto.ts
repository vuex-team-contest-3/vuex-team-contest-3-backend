import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class UpdateClinicDto {
  @ApiProperty({
    example: 'ShifoMed',
    description: 'The name of the Clinic',
  })
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Yunusobod, Toshkent',
    description: 'The address of the Clinic',
  })
  @IsNotEmpty()
  @IsString()
  address?: string;

  @ApiProperty({
    example: '+998991234567',
    description: 'The phone number of the Clinic',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone?: string;
}
