import { Diagnosis } from '../../diagnosis/models/diagnosis.model';
import { Doctor } from '../../doctor/models/doctor.model';
import { Client } from '../../client/models/client.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface QueueAttr {
  is_active: boolean;
  spent_time: string;
  image_name: string;
  client_id: number;
  doctor_id: number;
  diagnosis_id: number;
}

@Table({ tableName: 'queue' })
export class Queue extends Model<Queue, QueueAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.BOOLEAN })
  is_active: boolean;

  @Column({ type: DataType.STRING })
  spent_time: string;

  @Column({ type: DataType.STRING })
  image_name: string;

  @ForeignKey(() => Client)
  @Column({ type: DataType.INTEGER })
  client_id: number;

  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER })
  doctor_id: number;

  @ForeignKey(() => Diagnosis)
  @Column({ type: DataType.INTEGER })
  diagnosis_id: number;

  @BelongsTo(() => Client)
  client: Client;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @BelongsTo(() => Diagnosis)
  diagnosis: Diagnosis;
}
