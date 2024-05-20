import { UUID } from 'crypto';
import { tObject } from '#/entities/index'

import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';

export interface tDocumentsAttributes {
  docId: UUID;
  docname?: string;
  description?: string;
  status?: string;
  priority?: string;
  doctype?: string,
  author?: string;
  filepath?: string;
  objectId?: UUID;
  dateEdited?: Date;
  dateCreated?: Date;
  links?: JSON;
  tags?: JSON;
  dependencies?: JSON;
}

@Table({ tableName: 't_documents', timestamps: false })
export class tDocuments
  extends Model<tDocumentsAttributes, tDocumentsAttributes>
  implements tDocumentsAttributes
{
  @PrimaryKey
  @Column({ field: 'doc_id', allowNull: false, type: DataType.STRING(40) })
  docId: UUID;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  docname?: string;
  
  @Column({ allowNull: true, type: DataType.STRING(255) })
  description?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  status?: string;
  
  @Column({ allowNull: true, type: DataType.STRING(40) })
  priority?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  doctype?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  author?: string;

  @Column({ allowNull: true, type: DataType.STRING() })
  filepath?: string;

  @Column({ allowNull: true, type: DataType.JSON() })
  links?: JSON;

  @Column({ allowNull: true, type: DataType.JSON() })
  tags?: JSON;

  @Column({ allowNull: true, type: DataType.JSON() })
  dependencies?: JSON;

  @Column({field:'date_created', allowNull: true, type: DataType.DATE(6) })
  dateCreated?: Date;

  @Column({field:'date_created', allowNull: true, type: DataType.DATE(6) })
  dateEdited?: Date;

  @ForeignKey(() => tObject)
  @Column({ field: 'object_id', allowNull: true, type: DataType.INTEGER })
  objectId?: UUID;
}
