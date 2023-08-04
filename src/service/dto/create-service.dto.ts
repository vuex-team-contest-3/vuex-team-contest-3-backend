import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    example: 'Stomotolog',
    description: 'The name of the Service',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '$50',
    description: 'The price of the Service',
  })
  @IsNotEmpty()
  @IsString()
  price: string;

  @ApiProperty({
    example: 1,
    description: 'The clinic ID of the Service',
  })
  @IsNotEmpty()
  @IsString()
  clinic_id: number;
}
