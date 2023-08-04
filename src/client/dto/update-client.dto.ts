import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateClientDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the Client',
  })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the Client',
  })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty({
    example: 19,
    description: 'The age of the Client',
  })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({
    example: '+998991324657',
    description: 'The login of the Client',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
