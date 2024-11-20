import { Expose } from "class-transformer";
export class UserSerializer{
    @Expose()
    id: string;
    @Expose()
    nombre: string;
    @Expose()
    apellido: string;
    @Expose()
    username: string;
    @Expose()
    email: string;
    @Expose()
    age: number;
}