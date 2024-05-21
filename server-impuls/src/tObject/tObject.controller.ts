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
import { tObjectService } from './tObject.service';
import { tObject } from './tObject';

@Controller('/projects/:projectId/objects')
export class tObjectController {
  constructor(private readonly tObjectService: tObjectService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  findAll(@Param('projectId', new ParseUUIDPipe()) projectId: string) {
    return this.tObjectService.findAll(projectId);
  }

  @UseGuards(AuthGuard)
  @Post('/')
  create(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Body() newObject: tObject,
  ) {
    return this.tObjectService.create(projectId, newObject);
  }

  @UseGuards(AuthGuard)
  @Get('/:uuid')
  findOne(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ) {
    return this.tObjectService.findOne(projectId, uuid);
  }

  @UseGuards(AuthGuard)
  @Put('/:uuid')
  updateWithUID(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() newObject: tObject,
  ) {
    return this.tObjectService.update(projectId, newObject, uuid);
  }
  @UseGuards(AuthGuard)
  @Put('/')
  update(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Body() newObject: tObject,
  ) {
    return this.tObjectService.update(projectId, newObject);
  }

  @UseGuards(AuthGuard)
  @Delete('/:uuid')
  delete(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ) {
    return this.tObjectService.delete(projectId, uuid);
  }
}
