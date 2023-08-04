import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  IsBooleanString,
  IsNumberString,
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
    example: '30 min',
    description: 'The started time of the Queue',
  })
  @IsOptional()
  @IsString()
  started_at?: string;

  @ApiProperty({
    example: '30 min',
    description: 'The finished time of the Queue',
  })
  @IsOptional()
  @IsString()
  finished_at?: string;

  // @ApiProperty({
  //   example: 1,
  //   description: 'The client ID of the Queue',
  // })
  // @IsOptional()
  // @IsNumber()
  // client_id?: number;

  // @ApiProperty({
  //   example: 1,
  //   description: 'The doctor ID of the Queue',
  // })
  // @IsOptional()
  // @IsNumber()
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
