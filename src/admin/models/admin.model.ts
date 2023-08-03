import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminAttr {
  login: string;
  hashed_password: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  login: string;

  @Column({ type: DataType.STRING })
  hashed_password: string;
}
