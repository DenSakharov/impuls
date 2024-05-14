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
  logId: number;
  datetime?: Date;
  author?: string;
  notes?: string;
  objectId?: number;
  logtype?: string;
  modules?: string;
  actions?: string;
}

@Table({ tableName: 't_changehistory', timestamps: false })
export class tChangehistory
  extends Model<tChangehistoryAttributes, tChangehistoryAttributes>
  implements tChangehistoryAttributes
{
  @Column({
    field: 'log_id',
    allowNull: false,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval(('log_id_seq'::text)::regclass)"),
  })
  logId: number;

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
}
