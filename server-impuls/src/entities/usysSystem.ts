import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface usysSystemAttributes {
  property: string;
  value?: string;
}

@Table({ tableName: 'usys_system', timestamps: false })
export class usysSystem
  extends Model<usysSystemAttributes, usysSystemAttributes>
  implements usysSystemAttributes
{
  @Column({ allowNull: false, type: DataType.STRING(50) })
  property: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  value?: string;
}
