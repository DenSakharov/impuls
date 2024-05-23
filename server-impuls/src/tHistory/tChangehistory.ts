import { UUID } from 'crypto';
import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface tChangehistoryAttributes {
  logId: UUID;
  datetime?: Date;
  author?: string;
  notes?: string;
  objectId?: number;
  logtype?: string;
  modules?: string;
  actions?: string;
  dateEdited?:Date;
}

@Table({ tableName: 't_changehistory', timestamps: false })
export class tChangehistory
  extends Model<tChangehistoryAttributes, tChangehistoryAttributes>
  implements tChangehistoryAttributes
{
  @Column({ field: 'log_id', allowNull: false, type: DataType.STRING(40), primaryKey: true })
  logId:UUID;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  datetime?: Date;

  @Column({ allowNull: true, type: DataType.STRING(250) })
  author?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  notes?: string;

  @Column({ field: 'object_id', allowNull: true, type: DataType.INTEGER })
  objectId?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  logtype?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  modules?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  actions?: string;

  @Column({ field: 'date_edited', allowNull: true, type: DataType.DATE(6) })
  dateEdited?: Date;
}
