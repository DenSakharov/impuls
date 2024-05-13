import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface tTasksAttributes {
  taskid: number;
  name?: string;
  tasktype?: string;
  notes?: string;
  priority?: string;
  status?: string;
  owner?: string;
  startdate?: string;
  enddate?: string;
  phase?: string;
  history?: string;
  percent?: number;
  totaltime?: number;
  actualtime?: number;
  assignedto?: string;
}

@Table({ tableName: 't_tasks', timestamps: false })
export class tTasks
  extends Model<tTasksAttributes, tTasksAttributes>
  implements tTasksAttributes
{
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval(('taskid_seq'::text)::regclass)"),
  })
  taskid: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  tasktype?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  notes?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  priority?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  status?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  owner?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  startdate?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  enddate?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  phase?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  history?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  percent?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  totaltime?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  actualtime?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  assignedto?: string;
}
