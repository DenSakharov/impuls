import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface tGlossaryAttributes {
  term?: string;
  type?: string;
  meaning?: string;
  glossaryid: number;
}

@Table({ tableName: 't_glossary', timestamps: false })
export class tGlossary
  extends Model<tGlossaryAttributes, tGlossaryAttributes>
  implements tGlossaryAttributes
{
  @Column({ allowNull: true, type: DataType.STRING(255) })
  term?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  type?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  meaning?: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval(('glossaryid_seq'::text)::regclass)",
    ),
  })
  glossaryid: number;
}
