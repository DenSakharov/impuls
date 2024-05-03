import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface tStereotypesAttributes {
  stereotype: string;
  appliesto: string;
  description?: string;
  mfenabled?: number;
  mfpath?: string;
  metafile?: Uint8Array;
  style?: string;
  eaGuid?: string;
  visualtype?: string;
}

@Table({ tableName: 't_stereotypes', timestamps: false })
export class tStereotypes
  extends Model<tStereotypesAttributes, tStereotypesAttributes>
  implements tStereotypesAttributes
{
  @Column({ allowNull: false, type: DataType.STRING(255) })
  stereotype: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  appliesto: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  description?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal('0'),
  })
  mfenabled?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  mfpath?: string;

  @Column({ allowNull: true, type: DataType.BLOB })
  metafile?: Uint8Array;

  @Column({ allowNull: true, type: DataType.STRING })
  style?: string;

  @Column({ field: 'ea_guid', allowNull: true, type: DataType.STRING(50) })
  eaGuid?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  visualtype?: string;
}
