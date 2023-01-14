import { Table, Column, Model, DataType } from 'sequelize-typescript';


@Table({
  timestamps: true,
  tableName: 'comments',
})

export class Comments extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  id!: number;
}