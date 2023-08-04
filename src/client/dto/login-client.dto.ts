import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class LoginClientDto {
  @ApiProperty({
    example: 'John',
    description: 'The login of the Client',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    example: '+998991234657',
    description: 'The password of the Client',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  password: string;
}
