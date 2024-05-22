import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '#/auth/auth.guard';
import { tPackageService } from './tPackage.service';
import { tPackage } from './tPackage';

@Controller('/projects/:projectId/packages')
export class tPackageController {
  constructor(private readonly tPackageService: tPackageService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  findAll(@Param('projectId', new ParseUUIDPipe()) projectId: string) {
    return this.tPackageService.findAll(projectId);
  }
  @UseGuards(AuthGuard)
  @Get('/tree')
  tree(@Param('projectId', new ParseUUIDPipe()) projectId: string) {
    return this.tPackageService.tree(projectId);
  }

  @UseGuards(AuthGuard)
  @Post('/')
  create(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Body() newPackage: tPackage,
  ) {
    return this.tPackageService.create(projectId, newPackage);
  }

  @UseGuards(AuthGuard)
  @Get('/:uuid')
  findOne(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ) {
    return this.tPackageService.findOne(projectId, uuid);
  }

  @UseGuards(AuthGuard)
  @Put('/:uuid')
  updateWithUID(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() newPackage: tPackage,
  ) {
    return this.tPackageService.update(projectId, newPackage, uuid);
  }
  @UseGuards(AuthGuard)
  @Put('/')
  update(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Body() newPackage: tPackage,
  ) {
    return this.tPackageService.update(projectId, newPackage);
  }

  @UseGuards(AuthGuard)
  @Delete('/:uuid')
  delete(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ) {
    return this.tPackageService.delete(projectId, uuid);
  }
}
