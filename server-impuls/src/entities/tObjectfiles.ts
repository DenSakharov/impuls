import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface tObjectfilesAttributes {
  objectId: number;
  filename: string;
  type?: string;
  note?: string;
  filesize?: string;
  filedate?: string;
  fileid?: string;
}

@Table({ tableName: 't_objectfiles', timestamps: false })
export class tObjectfiles
  extends Model<tObjectfilesAttributes, tObjectfilesAttributes>
  implements tObjectfilesAttributes
{
  @Column({
    field: 'object_id',
    allowNull: false,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal('0'),
  })
  objectId: number;

  @Column({ allowNull: false, type: DataType.STRING(1000) })
  filename: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  type?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  note?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  filesize?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  filedate?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  fileid?: string;
}
