import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface tProjectAttributes {
  projectId: number;
  name?: string;
  notes?: string;
  status?: string;
  imsGuid?: string;
}

@Table({ tableName: 't_project', timestamps: false })
export class tProject
  extends Model<tProjectAttributes, tProjectAttributes>
  implements tProjectAttributes
{
  @Column({
    field: 'project_id',
    allowNull: false,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval(('project_id_seq'::text)::regclass)",
    ),
  })
  projectId: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  notes?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  status?: string;

  @Column({ field: 'ims_guid', allowNull: true, type: DataType.STRING(40) })
  imsGuid?: string;
}
