import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ description: 'Login exitoso' })
  @ApiUnauthorizedResponse({ description: 'Credenciales inválidas' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);

    if (!result) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return result;
  }
}
