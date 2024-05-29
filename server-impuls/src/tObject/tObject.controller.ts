import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put, Request, Res, UseGuards } from '@nestjs/common';

import { AuthGuard } from '#/auth/auth.guard';
import { tObjectService } from './tObject.service';
import { tObject } from './tObject';
import { Response } from 'express';

@Controller('/projects/:projectId/objects')
export class tObjectController {
  constructor(private readonly tObjectService: tObjectService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async findAll(@Res() res: Response, @Param('projectId', new ParseUUIDPipe()) projectId: string) {
    const data = await this.tObjectService.findAll(projectId);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Object not found' });
    }
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async create(
    @Request() req,
    @Res() res: Response,

    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Body() newObject: tObject,
  ) {
    const author = req.user?.userlogin ?? 'anonymous';
    const data = await this.tObjectService.create(projectId, newObject, author);
    return res.status(data.status).json(data);
  }

  @UseGuards(AuthGuard)
  @Get('/:uuid')
  async findOne(
    @Res() res: Response,

    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ) {
    const data = await this.tObjectService.findOne(projectId, uuid);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Object not found' });
    }
  }

  @UseGuards(AuthGuard)
  @Put('/:uuid')
  async updateWithUID(
    @Request() req,
    @Res() res: Response,

    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() newObject: tObject,
  ) {
    const author = req.user?.userlogin ?? 'anonymous';
    const data = await this.tObjectService.update(projectId, newObject, author, uuid);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Object not found' });
    }
  }
  @UseGuards(AuthGuard)
  @Put('/')
  async update(
    @Request() req,
    @Res() res: Response,

    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Body() newObject: tObject,
  ) {
    const author = req.user?.userlogin ?? 'anonymous';
    const data = await this.tObjectService.update(projectId, newObject, author);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Object not found' });
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/:uuid')
  async delete(
    @Request() req,
    @Res() res: Response,

    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ) {
    const author = req.user?.userlogin ?? 'anonymous';
    const data = await this.tObjectService.delete(projectId, uuid, author);
    return res.status(data.status).json(data);
  }
}
