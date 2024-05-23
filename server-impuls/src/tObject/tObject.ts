import { tPackage, tProject } from '#/entities';
import { UUID } from 'crypto';
import {
  Model,
  Table,
  Column,
  DataType,
  Sequelize,
  PrimaryKey,
  ForeignKey,
} from 'sequelize-typescript';

export interface tObjectAttributes {
  objectId: UUID;
  objectType?: string;
  name?: string;
  alias?: string;
  author?: string;
  version?: string;
  note?: string;
  packageId?: UUID;
  stereotype?: string;
  status?: string;
  imsGuid?: string;
  propertyId?: number; //What is it?
  connectorId?: number; //What is it?
  filename?: string;
  appliesto?: string;
  projectId?: UUID;
  dateEdited?: Date;
  dateCreated?: Date;
}

@Table({ tableName: 't_object', timestamps: false })
export class tObject
  extends Model<tObjectAttributes, tObjectAttributes>
  implements tObjectAttributes
{
  @PrimaryKey
  @Column({ field: 'object_id', allowNull: false, type: DataType.STRING(40) })
  objectId: UUID;

  @Column({ field: 'object_type', allowNull: true, type: DataType.STRING(255) })
  objectType?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  alias?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  author?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    defaultValue: Sequelize.literal("'1.0'::character varying"),
  })
  version?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  note?: string;

  @ForeignKey(() => tPackage)
  @Column({ field: 'package_id', allowNull: true, type: DataType.STRING(40) })
  packageId?: UUID;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  stereotype?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  status?: string;

  @Column({ field: 'ims_guid', allowNull: true, type: DataType.STRING(40) })
  imsGuid?: string;

  @Column({ field: 'property_id', allowNull: true, type: DataType.INTEGER })
  propertyId?: number;

  @Column({ field: 'connector_id', allowNull: true, type: DataType.INTEGER })
  connectorId?: number;

  @Column({ allowNull: true, type: DataType.STRING(1000) })
  filename?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  appliesto?: string;

  @ForeignKey(() => tProject)
  @Column({ field: 'project_id', allowNull: true, type: DataType.STRING(40) })
  projectId?: UUID;

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
