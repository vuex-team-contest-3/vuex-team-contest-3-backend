import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
}
