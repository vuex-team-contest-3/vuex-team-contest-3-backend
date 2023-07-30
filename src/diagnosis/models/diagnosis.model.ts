import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface DiagnosisAttr {
  name:string
	
}

@Table({ tableName: 'diagnosis' })
export class Diagnosis extends Model<Diagnosis, DiagnosisAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	
}
