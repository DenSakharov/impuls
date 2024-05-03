import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface tSecusergroupAttributes {
  userid: string;
  groupid: string;
}

@Table({ tableName: 't_secusergroup', timestamps: false })
export class tSecusergroup
  extends Model<tSecusergroupAttributes, tSecusergroupAttributes>
  implements tSecusergroupAttributes
{
  @Column({ allowNull: false, type: DataType.STRING(40) })
  userid: string;

  @Column({ allowNull: false, type: DataType.STRING(40) })
  groupid: string;
}
