import { Diagnosis } from "../../diagnosis/models/diagnosis.model";
import { Doctor } from "../../doctor/models/doctor.model";
import { Clinic } from "../../clinic/models/clinic.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface QueueAttr {
  is_active:boolean
	spent_time:string
	image_name:string
	clinic_id:number
	doctor_id:number
	diagnosis_id:number
	
}

@Table({ tableName: 'queue' })
export class Queue extends Model<Queue, QueueAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.BOOLEAN })
	is_active:boolean;

	@Column({ type: DataType.STRING })
	spent_time:string;

	@Column({ type: DataType.STRING })
	image_name:string;

	@ForeignKey(() => Clinic)
	@Column({ type: DataType.INTEGER })
	clinic_id: number;
	@BelongsTo(() => Clinic)
	clinic: Clinic[];

	@ForeignKey(() => Doctor)
	@Column({ type: DataType.INTEGER })
	doctor_id: number;
	@BelongsTo(() => Doctor)
	doctor: Doctor[];

	@ForeignKey(() => Diagnosis)
	@Column({ type: DataType.INTEGER })
	diagnosis_id: number;
	@BelongsTo(() => Diagnosis)
	diagnosis: Diagnosis[];

	
}
