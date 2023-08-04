import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateClinicDto {
  @ApiProperty({
    example: 'ShifoMed',
    description: 'The name of the Clinic',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Yunusobod, Toshkent',
    description: 'The address of the Clinic',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    example: '+998991234657',
    description: 'The phone number of the Clinic',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
