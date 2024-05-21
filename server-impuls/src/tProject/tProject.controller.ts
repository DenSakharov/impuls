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
import { tProjectService } from './tProject.service';
import { tProject } from './tProject';

@Controller('/projects')
export class tProjectController {
  constructor(private readonly tProjectService: tProjectService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  findAll() {
    return this.tProjectService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('/')
  create(@Body() newProject: tProject) {
    return this.tProjectService.create(newProject);
  }

  @UseGuards(AuthGuard)
  @Get('/:uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    console.log('uuid:', uuid);

    return this.tProjectService.findOne(uuid);
  }

  @UseGuards(AuthGuard)
  @Put('/:uuid')
  updateWithUID(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() newProject: tProject,
  ) {
    console.log(newProject);

    return this.tProjectService.update(newProject, uuid);
  }

  @UseGuards(AuthGuard)
  @Put('/')
  update(@Body() newProject: tProject) {
    return this.tProjectService.update(newProject);
  }
  @UseGuards(AuthGuard)
  @Delete('/:uuid')
  delete(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.tProjectService.delete(uuid);
  }
}
