import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'john77',
    description: 'The login of the Admin',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    example: 'Uzbek1&t0n',
    description: 'The password of the Admin',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
