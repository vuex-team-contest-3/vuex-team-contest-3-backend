import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class CreateQueueDto {
  @ApiProperty({
    example: 1,
    description: 'The client ID of the Queue',
  })
  @IsNotEmpty()
  @IsNumberString()
  client_id: number;

  @ApiProperty({
    example: 1,
    description: 'The doctor ID of the Queue',
  })
  @IsNotEmpty()
  @IsNumberString()
  doctor_id: number;
}
