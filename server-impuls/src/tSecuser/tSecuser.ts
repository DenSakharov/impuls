import { UUID } from 'crypto';
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

export interface tSecuserAttributes {
  userid: UUID;
  userlogin: string;
  userEmail: string;
  firstname: string;
  surname: string;
  department?: string;
  password?: string;
  groupid?: string;
}


@Table({ tableName: 't_secuser', timestamps: false })
export class tSecuser
  extends Model<tSecuserAttributes, tSecuserAttributes>
  implements tSecuserAttributes
{
  @PrimaryKey
  @Column({ allowNull: false, type: DataType.UUID })
  userid: UUID;

  @Column({ allowNull: false, type: DataType.STRING(255), unique: true })
  userlogin: string;

  @Column({ allowNull: false, type: DataType.STRING(50) })
  firstname: string;

  @Column({ allowNull: false, type: DataType.STRING(50) })
  userEmail: string;

  @Column({ allowNull: false, type: DataType.STRING(50) })
  surname: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  department?: string;

  @Column({ allowNull: true, type: DataType.STRING(12) })
  password?: string;

  @Column({ allowNull: true, type: DataType.STRING(40) })
  groupid?: string;
}
