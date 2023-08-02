import { Queue } from '../../queue/models/queue.model';
import { Clinic } from '../../clinic/models/clinic.model';
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

interface DoctorAttr {
  first_name: string;
  last_name: string;
  phone: string;
  profession: string;
  experience: string;
  work_time: string;
  work_day: string;
  floor: string;
  room: string;
  image_name: string;
  service_id: number;
  clinic_id: number;
}

@Table({ tableName: 'doctor' })
export class Doctor extends Model<Doctor, DoctorAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  first_name: string;

  @Column({ type: DataType.STRING })
  last_name: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  profession: string;

  @Column({ type: DataType.STRING })
  experience: string;

  @Column({ type: DataType.STRING })
  work_time: string;

  @Column({ type: DataType.STRING })
  work_day: string;

  @Column({ type: DataType.STRING })
  floor: string;

  @Column({ type: DataType.STRING })
  room: string;

  @Column({ type: DataType.STRING })
  image_name: string;

  @ForeignKey(() => Service)
  @Column({ type: DataType.INTEGER })
  service_id: number;

  @ForeignKey(() => Clinic)
  @Column({ type: DataType.INTEGER })
  clinic_id: number;

  @HasMany(() => Queue)
  queue: Queue[];

  @BelongsTo(() => Service)
  service: Service;

  @BelongsTo(() => Clinic)
  clinic: Clinic;
}
