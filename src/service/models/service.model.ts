import { Doctor } from '../../doctor/models/doctor.model';
import { Diagnosis } from '../../diagnosis/models/diagnosis.model';
import { Clinic } from '../../clinic/models/clinic.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface ServiceAttr {
  name: string;
  price: string;
  clinic_id: number;
}

@Table({ tableName: 'service' })
export class Service extends Model<Service, ServiceAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  price: string;

  @ForeignKey(() => Clinic)
  @Column({ type: DataType.INTEGER })
  clinic_id: number;
  @BelongsTo(() => Clinic)
  clinic: Clinic[];

  @HasMany(() => Doctor)
  doctor: Doctor[];

  @HasMany(() => Diagnosis)
  diagnosis: Diagnosis[];
}
