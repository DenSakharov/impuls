import { UUID } from 'crypto';
import {
  Model,
  Table,
  Column,
  DataType,
  Sequelize,
  PrimaryKey,
} from 'sequelize-typescript';

export interface tProjectAttributes {
  projectId: UUID;
  name?: string;
  notes?: string;
  status?: string;
  imsGuid?: string;
  dateEdited?: Date;
  dateCreated?: Date;
}

@Table({ tableName: 't_project', timestamps: false })
export class tProject
  extends Model<tProjectAttributes, tProjectAttributes>
  implements tProjectAttributes
{
  @PrimaryKey
  @Column({ field: 'doc_id', allowNull: false, type: DataType.STRING(40) })
  projectId: UUID;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  notes?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  status?: string;

  @Column({ field: 'ims_guid', allowNull: true, type: DataType.STRING(40) })
  imsGuid?: string;

  @Column({
    field: 'date_created',
    allowNull: false,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(6)'),
  })
  dateCreated?: Date;

  @Column({
    field: 'date_edited',
    allowNull: false,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(6)'),
  })
  dateEdited?: Date;
}
