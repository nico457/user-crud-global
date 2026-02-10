import { IsOptional, IsString } from "class-validator";

export class UserQueryDto {
  @IsString()
  @IsOptional()
  q: string; 
  @IsString()
  @IsOptional()
  role: string;  
}
