import { IsString, IsEmail, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  @IsString( {message: 'El nombre debe ser una cadena de texto'} )
  @IsNotEmpty({message: 'El nombre no debe estar vacio'})
  nombre: string;

  @IsString( {message: 'El apellido debe ser una cadena de texto'} )
  @IsNotEmpty({message: 'El apellido no debe estar vacio'})
  apellido: string;

  @IsString( {message: 'El username debe ser una cadena de texto'} )
  @IsNotEmpty({message: 'El username no debe estar vacio'})
  username: string;

  @IsString( {message: 'El email debe ser una cadena de texto'} )
  @IsNotEmpty({message: 'El email no debe estar vacio'})
  @IsEmail({}, {message: 'El email debe ser un email valido'})  
  email: string;

  @IsInt()
  @Min(18, { message: 'La edad debe ser al menos 18 años' })
  @Max(100, { message: 'La edad no puede ser mayor a 100 años' })
  age: number;
}
