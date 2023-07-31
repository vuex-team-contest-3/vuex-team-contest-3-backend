import { Service } from '../../service/models/service.model';
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
  name: string;
  service_id: number;
}

@Table({ tableName: 'diagnosis' })
export class Diagnosis extends Model<Diagnosis, DiagnosisAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @ForeignKey(() => Service)
  @Column({ type: DataType.INTEGER })
  service_id: number;
  @BelongsTo(() => Service)
  service: Service[];
}
