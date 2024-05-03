import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface tFilesAttributes {
  fileid: string;
  appliesto: string;
  category: string;
  name: string;
  file?: string;
  notes?: string;
  filedate?: Date;
  filesize?: number;
  objectId?: number;
  filename?: string;
}

@Table({ tableName: 't_files', timestamps: false })
export class tFiles
  extends Model<tFilesAttributes, tFilesAttributes>
  implements tFilesAttributes
{
  @Column({ allowNull: false, type: DataType.STRING(50) })
  fileid: string;

  @Column({ allowNull: false, type: DataType.STRING(50) })
  appliesto: string;

  @Column({ allowNull: false, type: DataType.STRING(100) })
  category: string;

  @Column({ allowNull: false, type: DataType.STRING(150) })
  name: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  file?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  notes?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  filedate?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  filesize?: number;

  @Column({ field: 'object_id', allowNull: true, type: DataType.INTEGER })
  objectId?: number;

  @Column({ allowNull: true, type: DataType.STRING(1000) })
  filename?: string;
}
