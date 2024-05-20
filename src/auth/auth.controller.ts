import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { mapErrorCodeToHttpResponse } from 'src/utils/httpResponse';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

@Controller({
  version: '1',
  path: 'auth'
})
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signUp(@Body() userToSignUp: RegisterDto) {
    const res = await this.userService.createUser(userToSignUp);
    const {password, password_reset_token, activation_token, ...user}: User = res.body
    return mapErrorCodeToHttpResponse(res.code, user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() userToLogin: LoginDto) {
    const res = await this.authService.login(userToLogin);
    return mapErrorCodeToHttpResponse(res.code, res.body);
  }
}
