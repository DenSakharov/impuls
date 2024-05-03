import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface tObjectAttributes {
  objectId: number;
  objectType?: string;
  name?: string;
  alias?: string;
  author?: string;
  version?: string;
  note?: string;
  packageId?: number;
  stereotype?: string;
  status?: string;
  imsGuid?: string;
  propertyId?: number;
  connectorId?: number;
  filename?: string;
  appliesto?: string;
  projectId?: number;
}

@Table({ tableName: 't_object', timestamps: false })
export class tObject
  extends Model<tObjectAttributes, tObjectAttributes>
  implements tObjectAttributes
{
  @Column({
    field: 'object_id',
    allowNull: false,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval(('object_id_seq'::text)::regclass)",
    ),
  })
  objectId: number;

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

  @Column({
    field: 'package_id',
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal('0'),
  })
  packageId?: number;

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

  @Column({ field: 'project_id', allowNull: true, type: DataType.INTEGER })
  projectId?: number;
}
