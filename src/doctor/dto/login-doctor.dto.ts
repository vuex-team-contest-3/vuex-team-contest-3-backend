import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPhoneNumber } from 'class-validator';

export class LoginDoctorDto {
  @ApiProperty({
    example: 8,
    description: 'The login of the Doctor',
  })
  @IsNotEmpty()
  @IsNumber()
  login: number;

  @ApiProperty({
    example: '+998991234657',
    description: 'The password of the Doctor',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  password: string;
}
