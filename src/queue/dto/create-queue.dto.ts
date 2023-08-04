import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateQueueDto {
  @ApiProperty({
    example: true,
    description: 'The status of the Queue',
  })
  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: '30 min',
    description: 'The spent time of the Queue',
  })
  @IsNotEmpty()
  @IsString()
  spent_time: string;

  @ApiProperty({
    example: 1,
    description: 'The clinic ID of the Queue',
  })
  @IsNotEmpty()
  @IsString()
  clinic_id: number;

  @ApiProperty({
    example: 1,
    description: 'The doctor ID of the Queue',
  })
  @IsNotEmpty()
  @IsString()
  doctor_id: number;

  @ApiProperty({
    example: 1,
    description: 'The diagnosis ID of the Queue',
  })
  @IsNotEmpty()
  @IsString()
  diagnosis_id: number;
}
