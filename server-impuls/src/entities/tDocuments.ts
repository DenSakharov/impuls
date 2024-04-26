import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface tDocumentsAttributes {
  docId: string;
  docname?: string;
  notes?: string;
  style?: string;
  elementId: string;
  elementtype: string;
  strcontent?: string;
  bincontent?: Uint8Array;
  doctype?: string;
  author?: string;
  isactive?: number;
  sequence?: number;
  docdate?: Date;
  objectId?: number;
}

@Table({ tableName: 't_documents', timestamps: false })
export class tDocuments
  extends Model<tDocumentsAttributes, tDocumentsAttributes>
  implements tDocumentsAttributes
{
  @Column({ field: 'doc_id', allowNull: false, type: DataType.STRING(40) })
  docId: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  docname?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  notes?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  style?: string;

  @Column({ field: 'element_id', allowNull: false, type: DataType.STRING(40) })
  elementId: string;

  @Column({ allowNull: false, type: DataType.STRING(50) })
  elementtype: string;

  @Column({ allowNull: true, type: DataType.STRING })
  strcontent?: string;

  @Column({ allowNull: true, type: DataType.BLOB })
  bincontent?: Uint8Array;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  doctype?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  author?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal('1'),
  })
  isactive?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal('0'),
  })
  sequence?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  docdate?: Date;

  @Column({ field: 'object_id', allowNull: true, type: DataType.INTEGER })
  objectId?: number;
}
