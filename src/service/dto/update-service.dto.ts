import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto {
  @ApiProperty({
    example: 'Stomotolog',
    description: 'The name of the Service',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: '$50',
    description: 'The price of the Service',
  })
  @IsOptional()
  @IsString()
  price?: string;

  @ApiProperty({
    example: 1,
    description: 'The clinic ID of the Service',
  })
  @IsOptional()
  @IsNumber()
  clinic_id?: number;
}
