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
import { tDocumentsService } from '#/tDocuments/tDocuments.service';
import { tDocuments } from '#/tDocuments/tDocuments';
import { AuthGuard } from '#/auth/auth.guard';
import { TMessage } from '#/entities/Message';

@Controller('/documents')
export class tDocumentsController {
  constructor(private readonly tDocumentsService: tDocumentsService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  findAll(): Promise<tDocuments[]> {
    return this.tDocumentsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('/')
  create(@Body() newDocument: tDocuments): Promise<TMessage> {
    return this.tDocumentsService.create(newDocument);
  }

  @UseGuards(AuthGuard)
  @Get('/:uuid')
  findOne(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<tDocuments> {
    return this.tDocumentsService.findOne(uuid);
  }

  @UseGuards(AuthGuard)
  @Put('/:uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() newDocument: tDocuments,
  ): Promise<tDocuments> {
    return this.tDocumentsService.update(uuid, newDocument);
  }

  @UseGuards(AuthGuard)
  @Delete('/:uuid')
  delete(@Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<TMessage> {
    return this.tDocumentsService.delete(uuid);
  }
}
