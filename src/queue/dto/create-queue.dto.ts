import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateQueueDto {
  @ApiProperty({
    example: 1,
    description: 'The client ID of the Queue',
  })
  @IsNotEmpty()
  @IsNumber()
  client_id: number;

  @ApiProperty({
    example: 1,
    description: 'The doctor ID of the Queue',
  })
  @IsNotEmpty()
  @IsNumber()
  doctor_id: number;
}
