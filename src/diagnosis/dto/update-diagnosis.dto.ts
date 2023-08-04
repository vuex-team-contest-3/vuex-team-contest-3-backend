import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDiagnosisDto {
  @ApiProperty({
    example: 'Tish og`rig`i',
    description: 'The name of the Diagnosis',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
