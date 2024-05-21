import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
<<<<<<< HEAD
  signIn(@Body() signInDto: Record<string, any>): Promise<{ accessToken: string, userlogin: string }>  {
=======
  signIn(@Body() signInDto: Record<string, any>): Promise<{ accessToken: string }>  {
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
