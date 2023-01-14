import {
  Table,
  Column,
  DataType,
  Model,
  HasMany
} from 'sequelize-typescript';

import { Users } from '../users/Users'

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

  @HasMany(() => Users)
  users!: Users[]

}
