import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface tConnectorAttributes {
  connectorId: number;
  name?: string;
  direction?: string;
  notes?: string;
  connectorType?: string;
  startObjectId?: number;
  endObjectId?: number;
  imsGuid?: string;
}

@Table({ tableName: 't_connector', timestamps: false })
export class tConnector
  extends Model<tConnectorAttributes, tConnectorAttributes>
  implements tConnectorAttributes
{
  @Column({
    field: 'connector_id',
    allowNull: false,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval(('connector_id_seq'::text)::regclass)",
    ),
  })
  connectorId: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  direction?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  notes?: string;

  @Column({
    field: 'connector_type',
    allowNull: true,
    type: DataType.STRING(50),
  })
  connectorType?: string;

  @Column({
    field: 'start_object_id',
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal('0'),
  })
  startObjectId?: number;

  @Column({
    field: 'end_object_id',
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal('0'),
  })
  endObjectId?: number;

  @Column({ field: 'ims_guid', allowNull: true, type: DataType.STRING(40) })
  imsGuid?: string;
}
