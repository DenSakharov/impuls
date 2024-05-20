import { Injectable, Inject } from '@nestjs/common';
import { tDocuments } from '#/tDocuments/tDocuments';



@Injectable()
export class tDocumentsService {
  constructor(
    @Inject('DOCUMENTS_REPOSITORY')
    private tDocumentsRepository: typeof tDocuments,
  ) {}


  async create(newDocument: Partial<tDocuments>): Promise<string> {
      const documentUUID = crypto.randomUUID();
      try {
      await this.tDocumentsRepository.create({  
        docId: documentUUID,
        docname: newDocument.docname,        
        description: newDocument.description,
        objectId: newDocument.objectId,
        dateCreated: new Date(),
      });
      return `new document created uuid = ${documentUUID} `;

    } catch(error) {

      if (error.name === 'SequelizeUniqueConstraintError') {
        return 'This UUID already exists';
      } else {
        return error;        
      }

    }
  }

  async findAll(): Promise<tDocuments[]> {
    return this.tDocumentsRepository.findAll<tDocuments>();
  }

  async findByPk(uuid: string): Promise<tDocuments | undefined> {
    return this.tDocumentsRepository.findByPk<tDocuments>(uuid);
  }

  async findOne(objectId: string): Promise<tDocuments | undefined>{
    return this.tDocumentsRepository.findOne<tDocuments>({where: { objectId: objectId}});
  }
}