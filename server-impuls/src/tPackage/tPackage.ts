import { tProject } from '#/entities';
import { UUID } from 'crypto';
import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';

export interface tPackageAttributes {
  packageId?: UUID;
  name?: string;
  parentId?: UUID;
  notes?: string;
  imsGuid?: string;
  projectId?: UUID;
}

@Table({ tableName: 't_package', timestamps: false })
export class tPackage
  extends Model<tPackageAttributes, tPackageAttributes>
  implements tPackageAttributes
{
  @PrimaryKey
  @Column({ field: 'package_id', allowNull: false, type: DataType.STRING(40) })
  packageId: UUID;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  name?: string;

  @ForeignKey(() => tPackage)
  @Column({ field: 'parent_id', allowNull: true, type: DataType.INTEGER })
  parentId?: UUID;

  @Column({ allowNull: true, type: DataType.STRING })
  notes?: string;

  @Column({ field: 'ims_guid', allowNull: true, type: DataType.STRING(40) })
  imsGuid?: string;

  @ForeignKey(() => tProject)
  @Column({ field: 'project_id', allowNull: true, type: DataType.INTEGER })
  projectId?: UUID;
}
