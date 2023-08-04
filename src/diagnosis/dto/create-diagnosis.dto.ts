import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

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
  @IsNumberString()
  service_id: number;
}
