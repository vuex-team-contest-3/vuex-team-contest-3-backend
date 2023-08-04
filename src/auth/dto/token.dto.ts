import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty({
    example: 'token',
    description: 'Token',
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
