import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface tStatustypesAttributes {
  status: string;
  description?: string;
  objectId?: number;
}

@Table({ tableName: 't_statustypes', timestamps: false })
export class tStatustypes
  extends Model<tStatustypesAttributes, tStatustypesAttributes>
  implements tStatustypesAttributes
{
  @Column({ allowNull: false, type: DataType.STRING(50) })
  status: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  description?: string;

  @Column({ field: 'object_id', allowNull: true, type: DataType.INTEGER })
  objectId?: number;
}
