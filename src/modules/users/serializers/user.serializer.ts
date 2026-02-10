import { Exclude, Expose, Type } from "class-transformer";
import { ProfileSerializer } from "./profile.serializer";
export class UserSerializer{
    @Expose()
    id: string;
    @Expose()
    username: string;
    @Expose()
    email: string;
    @Expose()
    role: string;
    @Expose()
    @Type(() => ProfileSerializer)
    profile: ProfileSerializer;
    @Exclude()
    password: string;
}