import {
  Table,
  Column,
  DataType,
  Model
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'bands'
})

export class Bands extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  logo!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

}
