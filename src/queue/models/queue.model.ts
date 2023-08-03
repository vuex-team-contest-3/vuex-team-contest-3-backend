import { Diagnosis } from '../../diagnosis/models/diagnosis.model';
import { Doctor } from '../../doctor/models/doctor.model';
<<<<<<< HEAD
import { Clinic } from '../../clinic/models/clinic.model';
=======
import { Client } from '../../client/models/client.model';
>>>>>>> origin/main
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Client } from '../../client/models/client.model';

interface QueueAttr {
  is_active: boolean;
  spent_time: string;
  image_name: string;
<<<<<<< HEAD
  clinic_id: number;
=======
  client_id: number;
>>>>>>> origin/main
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

<<<<<<< HEAD
  @ForeignKey(() => Clinic)
  @Column({ type: DataType.INTEGER })
  clinic_id: number;
  @BelongsTo(() => Clinic)
  clinic: Clinic[];
=======
  @ForeignKey(() => Client)
  @Column({ type: DataType.INTEGER })
  client_id: number;
>>>>>>> origin/main

  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER })
  doctor_id: number;
<<<<<<< HEAD
  @BelongsTo(() => Doctor)
  doctor: Doctor[];
=======
>>>>>>> origin/main

  @ForeignKey(() => Diagnosis)
  @Column({ type: DataType.INTEGER })
  diagnosis_id: number;
<<<<<<< HEAD
  @BelongsTo(() => Diagnosis)
  diagnosis: Diagnosis[];

  @ForeignKey(() => Client)
  @Column({ type: DataType.INTEGER })
  client_id: number;
  @BelongsTo(() => Client)
  client: Client[];
=======

  @BelongsTo(() => Client)
  client: Client;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @BelongsTo(() => Diagnosis)
  diagnosis: Diagnosis;
>>>>>>> origin/main
}
