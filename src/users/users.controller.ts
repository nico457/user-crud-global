import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ description: 'Usuario creado con éxito' })
  @ApiBadRequestResponse({ description: 'Error en los datos ingresados' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @ApiOkResponse({ description: 'Lista de usuarios' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @ApiOkResponse({ description: 'Usuario con el id correspondiente' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOkResponse({ description: 'Usuario actualizado con éxito' })
  @ApiBadRequestResponse({ description: 'Error en los datos ingresados' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @ApiOkResponse({ description: 'Usuario eliminado con éxito' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
