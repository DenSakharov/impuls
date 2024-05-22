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
import { tDocumentsService } from '#/tDocuments/tDocuments.service';
import { tDocuments } from '#/tDocuments/tDocuments';
import { AuthGuard } from '#/auth/auth.guard';
import { Response } from 'express';

@Controller('/documents')
export class tDocumentsController {
  constructor(private readonly tDocumentsService: tDocumentsService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async findAll(@Res() res: Response) {
    const data = await this.tDocumentsService.findAll();
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async create(@Res() res: Response, @Body() newDocument: tDocuments) {
    const data = await this.tDocumentsService.create(newDocument);
    return res.status(data.status).json(data);
  }

  @UseGuards(AuthGuard)
  @Get('/:uuid')
  async findOne(
    @Res() res: Response,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ) {
    const data = await this.tDocumentsService.findOne(uuid);
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
  async update(
    @Res() res: Response,
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() newDocument: tDocuments,
  ) {
    const data = await this.tDocumentsService.update(uuid, newDocument);
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
    const data = await this.tDocumentsService.delete(uuid);
    return res.status(data.status).json(data);
  }
}
