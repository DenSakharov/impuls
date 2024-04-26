import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface tSecgroupAttributes {
  groupid: string;
  groupname: string;
  description?: string;
  userid?: string;
}

@Table({ tableName: 't_secgroup', timestamps: false })
export class tSecgroup
  extends Model<tSecgroupAttributes, tSecgroupAttributes>
  implements tSecgroupAttributes
{
  @Column({ allowNull: false, type: DataType.STRING(40) })
  groupid: string;

  @Column({ allowNull: false, type: DataType.STRING(32) })
  groupname: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  description?: string;

  @Column({ allowNull: true, type: DataType.STRING(40) })
  userid?: string;
}
