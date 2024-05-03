import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface tTaggedvalueAttributes {
  propertyId: string;
  elementId: string;
  tagvalue: string;
  notes?: string;
  baseclass?: string;
  objectId?: number;
}

@Table({ tableName: 't_taggedvalue', timestamps: false })
export class tTaggedvalue
  extends Model<tTaggedvalueAttributes, tTaggedvalueAttributes>
  implements tTaggedvalueAttributes
{
  @Column({ field: 'property_id', allowNull: false, type: DataType.STRING(40) })
  propertyId: string;

  @Column({ field: 'element_id', allowNull: false, type: DataType.STRING(40) })
  elementId: string;

  @Column({ allowNull: false, type: DataType.STRING })
  tagvalue: string;

  @Column({ allowNull: true, type: DataType.STRING })
  notes?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  baseclass?: string;

  @Column({ field: 'object_id', allowNull: true, type: DataType.INTEGER })
  objectId?: number;
}
