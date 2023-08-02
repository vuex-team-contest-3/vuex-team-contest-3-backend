import { Service } from '../../service/models/service.model';
import { Doctor } from '../../doctor/models/doctor.model';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface ClinicAttr {
  name: string;
  address: string;
  phone: string;
  image_name: string;
}

@Table({ tableName: 'clinic' })
export class Clinic extends Model<Clinic, ClinicAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  image_name: string;

  @HasMany(() => Service)
  service: Service[];

  @HasMany(() => Doctor)
  doctor: Doctor[];
}
