import { Queue } from '../../queue/models/queue.model';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface ClientAttr {
  first_name: string;
  last_name: string;
  age: number;
  phone: string;
}

@Table({ tableName: 'client' })
export class Client extends Model<Client, ClientAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  first_name: string;

  @Column({ type: DataType.STRING })
  last_name: string;

  @Column({ type: DataType.SMALLINT })
  age: number;

  @Column({ type: DataType.STRING })
  phone: string;

  @HasMany(() => Queue)
  queue: Queue[];
}
