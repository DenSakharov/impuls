import { Request, Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put, Res, UseGuards } from '@nestjs/common';

import { AuthGuard } from '#/auth/auth.guard';
import { tPackageService } from './tPackage.service';
import { tPackage } from './tPackage';
import { Response } from 'express';

@Controller('/projects/:projectId/packages')
export class tPackageController {
  constructor(private readonly tPackageService: tPackageService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async findAll(@Res() res: Response, @Param('projectId', new ParseUUIDPipe()) projectId: string) {
    const data = await this.tPackageService.findAll(projectId);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Package not found' });
    }
  }
  @UseGuards(AuthGuard)
  @Get('/tree')
  async tree(@Res() res: Response, @Param('projectId', new ParseUUIDPipe()) projectId: string) {
    const data = await this.tPackageService.tree(projectId);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Package not found' });
    }
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async create(@Request() req, @Res() res: Response, @Param('projectId', new ParseUUIDPipe()) projectId: string, @Body() newPackage: tPackage) {
    const author = req.user?.userlogin ?? 'anonymous';
    const data = await this.tPackageService.create(projectId, newPackage, author);
    return res.status(data.status).json(data);
  }

  @UseGuards(AuthGuard)
  @Get('/:uuid')
  async findOne(@Res() res: Response, @Param('projectId', new ParseUUIDPipe()) projectId: string, @Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const data = await this.tPackageService.findOne(projectId, uuid);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Package not found' });
    }
  }

  @UseGuards(AuthGuard)
  @Put('/:uuid')
  async updateWithUID(
    @Request() req,
    @Res() res: Response,
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() newPackage: tPackage,
  ) {
    const author = req.user?.userlogin ?? 'anonymous';
    const data = await this.tPackageService.update(projectId, newPackage, uuid, author);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Package not found' });
    }
  }
  @UseGuards(AuthGuard)
  @Put('/')
  async update(@Request() req, @Res() res: Response, @Param('projectId', new ParseUUIDPipe()) projectId: string, @Body() newPackage: tPackage) {
    const author = req.user?.userlogin ?? 'anonymous';
    const data = await this.tPackageService.update(projectId, newPackage, author);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Package not found' });
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/:uuid')
  async delete(@Request() req, @Res() res: Response, @Param('projectId', new ParseUUIDPipe()) projectId: string, @Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const author = req.user?.userlogin ?? 'anonymous';
    const data = await this.tPackageService.delete(projectId, uuid, false, author);
    return res.status(data.status).json(data);
  }
}
