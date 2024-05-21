import { Injectable, UnauthorizedException } from '@nestjs/common';
import { tSecuserService } from '#/tSecuser/tSecuser.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export interface JwtPayload {
  userlogin: string;
}


@Injectable()
export class AuthService {
  constructor(
    private usersService: tSecuserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    userlogin: string,
    pass: string,
<<<<<<< HEAD
  ): Promise<{ accessToken: string, userlogin: string }> {
=======
  ): Promise<{ accessToken: string }> {
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6

    const user = await this.usersService.findOne(userlogin);

    if (!(user && (await bcrypt.compare(pass, user.password)))) {
      throw new UnauthorizedException('Please check your login credentials');
    }

    const payload: JwtPayload = { userlogin };
    const accessToken: string = this.jwtService.sign(payload);
<<<<<<< HEAD
    return { accessToken, userlogin };
=======
    return { accessToken };
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
  }
}
