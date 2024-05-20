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
  ): Promise<{ accessToken: string, userlogin: string }> {

    const user = await this.usersService.findOne(userlogin);

    if (!(user && (await bcrypt.compare(pass, user.password)))) {
      throw new UnauthorizedException('Please check your login credentials');
    }

    const payload: JwtPayload = { userlogin };
    const accessToken: string = this.jwtService.sign(payload);
    return { accessToken, userlogin };
  }
}
