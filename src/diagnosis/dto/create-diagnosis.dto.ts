import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDiagnosisDto {
  @ApiProperty({
    example: 'Tish og`rig`i',
    description: 'The name of the Diagnosis',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'The service ID of the Diagnosis',
  })
  @IsNotEmpty()
  @IsNumber()
  service_id: number;
}
