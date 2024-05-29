import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put, Res, UseGuards, Request } from '@nestjs/common';

import { AuthGuard } from '#/auth/auth.guard';
import { tProjectService } from './tProject.service';
import { tProject } from './tProject';
import { Response } from 'express';
// import { CreateProjectsDto } from './dto/create-projects.dto';
// import { UpdateProjectsDto } from './dto/update-projects.dto';

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
  async create(@Request() req, @Res() res: Response, @Body() newProject: tProject) {
    const author = req.user?.userlogin ?? 'anonymous';
    const data = await this.tProjectService.create(newProject, author);
    return res.status(data.status).json(data);
  }

  @UseGuards(AuthGuard)
  @Get('/:uuid')
  async findOne(@Res() res: Response, @Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const data = await this.tProjectService.findOne(uuid);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Object not found' });
    }
  }

  @UseGuards(AuthGuard)
  @Put('/:uuid')
  async updateWithUID(@Request() req, @Res() res: Response, @Param('uuid', new ParseUUIDPipe()) uuid: string, @Body() newProject: tProject) {
    const author = req.user?.userlogin ?? 'anonymous';
    const data = await this.tProjectService.update(newProject, author, uuid);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Object not found' });
    }
  }

  @UseGuards(AuthGuard)
  @Put('/')
  async update(@Request() req, @Res() res: Response, @Body() newProject: tProject) {
    const author = req.user?.userlogin ?? 'anonymous';
    const data = await this.tProjectService.update(newProject, author);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Object not found' });
    }
  }
  @UseGuards(AuthGuard)
  @Delete('/:uuid')
  async delete(@Request() req, @Res() res: Response, @Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const author = req.user?.userlogin ?? 'anonymous';
    const data = await this.tProjectService.delete(uuid, author);

    return res.status(data.status).json(data);
  }
}
