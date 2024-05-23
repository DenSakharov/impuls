import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { tSecuserService } from '#/tSecuser/tSecuser.service';
import { tSecuser } from '#/tSecuser/tSecuser';
import { AuthGuard } from '#/auth/auth.guard';
import { TMessage } from '#/entities/Message';
import { Response } from 'express';

@Controller('/users')
export class TSecuserController {
  constructor(private readonly tSecuserService: tSecuserService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async findAll(@Res() res: Response) {
    const data = await this.tSecuserService.findAll();
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Object not found' });
    }
  }

  @Post('/')
  async create(@Res() res: Response, @Body() newUser: tSecuser) {
    const data = await this.tSecuserService.create(newUser);
    return res.status(data.status).json(data);
  }

  @UseGuards(AuthGuard)
  @Get('/:userlogin')
  async findOne(@Res() res: Response, @Param('userlogin') userlogin: string) {
    const data = await this.tSecuserService.findOne(userlogin);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Object not found' });
    }
  }
}
