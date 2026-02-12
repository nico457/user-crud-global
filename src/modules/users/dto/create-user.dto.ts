import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { Gender } from './gender.enum';
import { Role } from './rol.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no debe estar vacio' })
  nombre: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El apellido no debe estar vacio' })
  apellido: string;

  @IsInt()
  @ApiProperty({
    example: 25,
    minimum: 1,
    maximum: 99,
    description: 'Edad del usuario (entre 1 y 99 años)',
  })
  @Min(18, { message: 'La edad debe ser al menos 18 años' })
  @Max(100, { message: 'La edad no puede ser mayor a 100 años' })
  edad: number;

  @ApiProperty({
    enum: Gender,
    example: Gender.M,
    description: 'Género permitido: M, F u OTRO',
  })
  @IsEnum(Gender, {
    message: 'El género debe ser M, F u OTRO',
  })
  @IsNotEmpty({ message: 'El género no debe estar vacio' })
  genero: string;

  @IsString({ message: 'El username debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El username no debe estar vacio' })
  username: string;

  @IsString({ message: 'El password debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El password no debe estar vacio' })
  password: string;

  @IsString({ message: 'El email debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El email no debe estar vacio' })
  @IsEmail({}, { message: 'El email debe ser un email valido' })
  email: string;

  @IsEnum(Role, {
    message: 'El rol debe ser ADMIN, USER o SUBSCRIBER',
  })
  @ApiProperty({
    enum: Role,
    example: Role.USER,
    description: 'Rol del sistema: ADMIN, USER o SUBSCRIBER',
  })
  @IsNotEmpty({ message: 'El rol no debe estar vacio' })
  role: string;
}
