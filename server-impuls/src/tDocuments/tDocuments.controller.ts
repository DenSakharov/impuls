import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { tDocumentsService } from '#/tDocuments/tDocuments.service';
import { tDocuments } from '#/tDocuments/tDocuments';
import { AuthGuard } from '#/auth/auth.guard';

@Controller('/documents')
export class tDocumentsController {
  constructor(private readonly tDocumentsService: tDocumentsService) {}
  
  @UseGuards(AuthGuard)
  @Get('/all')
  findAll(): Promise<tDocuments[]> {
    return this.tDocumentsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  create( newDocument: tDocuments): Promise<string> {
    return this.tDocumentsService.create(newDocument);
  }

  @UseGuards(AuthGuard)
  @Get(':uuid/read')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<tDocuments> {
    return this.tDocumentsService.findOne(uuid);
  }

  @UseGuards(AuthGuard)
  @Post(':uuid/update')
  update(@Body() newDocument: tDocuments): Promise<tDocuments> {
    return this.tDocumentsService.update(newDocument);
  }

  @UseGuards(AuthGuard)
  @Post(':uuid/delete')
  delete(@Body() newDocument: tDocuments): Promise<string> {
    return this.tDocumentsService.delete(newDocument);
  }
}
