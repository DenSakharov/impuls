import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '#/auth/auth.guard';
import { tProjectService } from './tProject.service';
import { tProject } from './tProject';
import { Response } from 'express';

@Controller('/projects')
export class tProjectController {
  constructor(private readonly tProjectService: tProjectService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async findAll(@Res() res: Response) {
    const data = await this.tProjectService.findAll();
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Object not found' });
    }
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async create(@Res() res: Response, @Body() newProject: tProject) {
    const data = await this.tProjectService.create(newProject);
    return res.status(data.status).json(data);
  }

  @UseGuards(AuthGuard)
  @Get('/:uuid')
  async findOne(
    @Res() res: Response,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ) {
    const data = await this.tProjectService.findOne(uuid);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Object not found' });
    }
  }

  @UseGuards(AuthGuard)
  @Put('/:uuid')
  async updateWithUID(
    @Res() res: Response,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() newProject: tProject,
  ) {
    const data = await this.tProjectService.update(newProject, uuid);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Object not found' });
    }
  }

  @UseGuards(AuthGuard)
  @Put('/')
  async update(@Res() res: Response, @Body() newProject: tProject) {
    const data = await this.tProjectService.update(newProject);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Object not found' });
    }
  }
  @UseGuards(AuthGuard)
  @Delete('/:uuid')
  async delete(
    @Res() res: Response,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ) {
    const data = await this.tProjectService.delete(uuid);

    return res.status(data.status).json(data);
  }
}
