import { Expose } from "class-transformer";

export class ProfileSerializer {
  @Expose()
  nombre: string;

  @Expose()
  apellido: string;

  @Expose()
  edad: number;

  @Expose()
  genero: string;

  
}