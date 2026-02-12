import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserQueryDto {
   @ApiPropertyOptional({
    description: 'Texto de búsqueda (nombre, apellido, email, username)',
    example: 'Juan',
  })
  @IsOptional()
  @IsString()
  q: string = ''; 
  @ApiPropertyOptional({
    description: 'Filtrar por rol',
    example: 'ADMIN',
  })
  @IsOptional()
  @IsString()
  role: string = '';  

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';
}
