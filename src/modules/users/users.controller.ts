import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { User } from './schemas/users.schemas';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UserSerializer } from './serializers/user.serializer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ description: 'Usuario creado con éxito' })
  @ApiBadRequestResponse({ description: 'Error en los datos ingresados' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserSerializer> {
    const data = await this.usersService.create(createUserDto);
    return plainToInstance(UserSerializer, data, {
      excludeExtraneousValues: true,
    });
  }
  @ApiOkResponse({ description: 'Lista de usuarios' })
  @Get()
  async findAll(): Promise<UserSerializer[]> {
    const data = await this.usersService.findAll();
    return plainToInstance(UserSerializer, data, {
      excludeExtraneousValues: true,
    });
  }
  @ApiOkResponse({ description: 'Usuario con el id correspondiente' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserSerializer> {
    const data = this.usersService.findOne(id);
    return plainToInstance(UserSerializer, data, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOkResponse({ description: 'Usuario actualizado con éxito' })
  @ApiBadRequestResponse({ description: 'Error en los datos ingresados' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserSerializer> {
    const data = await this.usersService.update(id, updateUserDto);
    return plainToInstance(UserSerializer, data, {
      excludeExtraneousValues: true,
    });
  }
  @ApiOkResponse({ description: 'Usuario eliminado con éxito' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
