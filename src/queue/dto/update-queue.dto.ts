import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsBooleanString,
  IsNumberString,
  IsDateString,
} from 'class-validator';

export class UpdateQueueDto {
  @ApiProperty({
    example: true,
    description: 'The status of the Queue',
  })
  @IsOptional()
  @IsBooleanString()
  is_active?: boolean;

  @ApiProperty({
    example: '2023-08-03T10:14:40.492Z',
    description: 'The started time of the Queue',
  })
  @IsOptional()
  @IsDateString()
  started_at?: string;

  @ApiProperty({
    example: '2023-08-03T10:14:50.492Z',
    description: 'The finished time of the Queue',
  })
  @IsOptional()
  @IsDateString()
  finished_at?: string;

  // @ApiProperty({
  //   example: 1,
  //   description: 'The client ID of the Queue',
  // })
  // @IsOptional()
  // @IsNumberString()
  // client_id?: number;

  // @ApiProperty({
  //   example: 1,
  //   description: 'The doctor ID of the Queue',
  // })
  // @IsOptional()
  // @IsNumberString()
  // doctor_id?: number;

  @ApiProperty({
    example: 1,
    description: 'The diagnosis ID of the Queue',
  })
  @IsOptional()
  @IsNumberString()
  diagnosis_id?: number;

  createdAt?: string;
}
