import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsNumberString,
} from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the Doctor',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the Doctor',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: '+998991234657',
    description: 'The phone of the Doctor',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'Dentist',
    description: 'The profession of the Doctor',
  })
  @IsNotEmpty()
  @IsString()
  profession: string;

  @ApiProperty({
    example: '6 years',
    description: 'The experience of the Doctor',
  })
  @IsNotEmpty()
  @IsString()
  experience: string;

  @ApiProperty({
    example: '8:00-12:00',
    description: 'The work time of the Doctor',
  })
  @IsNotEmpty()
  @IsString()
  work_time: string;

  @ApiProperty({
    example: 'Monday,Tuesday,Friday',
    description: 'The work day of the Doctor',
  })
  @IsNotEmpty()
  @IsString()
  work_day: string;

  @ApiProperty({
    example: '3',
    description: 'The floor of the Doctor`s room',
  })
  @IsNotEmpty()
  @IsString()
  floor: string;

  @ApiProperty({
    example: '17-a',
    description: 'The room of the Doctor',
  })
  @IsNotEmpty()
  @IsString()
  room: string;

  @ApiProperty({
    example: 3,
    description: 'The service ID of the Doctor',
  })
  @IsNotEmpty()
  @IsNumberString()
  service_id: number;

  @ApiProperty({
    example: 4,
    description: 'The clinic ID of the Doctor',
  })
  @IsNotEmpty()
  @IsNumberString()
  clinic_id: number;
}
