import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Bands } from '../bands/Bands';
import { Posts } from '../posts/Posts';


@Table({
  tableName: 'users',
  timestamps: true
})

export class Users extends Model{
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    defaultValue: 1
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  picture!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string

  @HasMany(() => Bands)
  bands!: Bands[]

  @HasMany(() => Posts)
  posts!: Posts[]

}