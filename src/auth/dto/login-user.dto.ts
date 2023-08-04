import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The login of the Client',
  })
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @ApiProperty({
    example: '+998991234657',
    description: 'The password of the Client',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly password: string;
}
