import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateQueueDto {
  @ApiProperty({
    example: true,
    description: 'The status of the Queue',
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({
    example: '30 min',
    description: 'The spent time of the Queue',
  })
  @IsOptional()
  @IsString()
  spent_time?: string;

  @ApiProperty({
    example: 1,
    description: 'The clinic ID of the Queue',
  })
  @IsOptional()
  @IsString()
  clinic_id?: number;

  @ApiProperty({
    example: 1,
    description: 'The doctor ID of the Queue',
  })
  @IsOptional()
  @IsString()
  doctor_id?: number;

  @ApiProperty({
    example: 1,
    description: 'The diagnosis ID of the Queue',
  })
  @IsOptional()
  @IsString()
  diagnosis_id?: number;
}
