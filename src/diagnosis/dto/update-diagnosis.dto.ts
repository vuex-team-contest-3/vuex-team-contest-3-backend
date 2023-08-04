import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateDiagnosisDto {
  @ApiProperty({
    example: 'Tish og`rig`i',
    description: 'The name of the Diagnosis',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 1,
    description: 'The service ID of the Diagnosis',
  })
  @IsOptional()
  @IsNumber()
  service_id?: number;
}
