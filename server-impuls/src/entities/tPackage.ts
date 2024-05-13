import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface tPackageAttributes {
  packageId?: number;
  name?: string;
  parentId?: number;
  notes?: string;
  imsGuid?: string;
  projectId?: number;
}

@Table({ tableName: 't_package', timestamps: false })
export class tPackage
  extends Model<tPackageAttributes, tPackageAttributes>
  implements tPackageAttributes
{
  @Column({
    field: 'package_id',
    allowNull: false,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval(('package_id_seq'::text)::regclass)",
    ),
  })
  packageId: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  name?: string;

  @Column({
    field: 'parent_id',
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal('0'),
  })
  parentId?: number;

  @Column({ allowNull: true, type: DataType.STRING })
  notes?: string;

  @Column({ field: 'ims_guid', allowNull: true, type: DataType.STRING(40) })
  imsGuid?: string;

  @Column({ field: 'project_id', allowNull: true, type: DataType.INTEGER })
  projectId?: number;
}
