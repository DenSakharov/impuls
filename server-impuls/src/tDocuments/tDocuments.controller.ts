import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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
  create(@Body() newDocument: tDocuments): Promise<string> {
    return this.tDocumentsService.create(newDocument);
  }

  @UseGuards(AuthGuard)
  @Get(':uuid')
  findOne(@Param('uuid') uuid: string): Promise<tDocuments> {
    return this.tDocumentsService.findOne(uuid);
  }
}
