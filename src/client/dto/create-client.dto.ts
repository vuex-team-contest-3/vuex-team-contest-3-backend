import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the Client',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the Client',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: 19,
    description: 'The age of the Client',
  })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({
    example: '+998991324657',
    description: 'The login of the Client',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
