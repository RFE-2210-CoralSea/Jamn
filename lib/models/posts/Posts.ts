import { NumberDecrementStepperProps } from '@chakra-ui/react';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Bands } from '../bands/Bands';
import { Users } from '../users/Users';
import { Comments } from '../comments/Comments'

@Table({
  timestamps: true,
  tableName: 'posts',
})

export class Posts extends Model {
  @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      defaultValue: 1
  })
  id!: number;

  @ForeignKey(() => Bands)
  @Column({
      type: DataType.INTEGER,
      allowNull: false,
  })
  band_id!: number

  @ForeignKey(() => Users)
  @Column({
      type: DataType.INTEGER,
      allowNull: false,
  })
  user_id!: Number;

  @Column({
      type: DataType.STRING,
      allowNull: false,
  })
  text!: string;

  @Column({
      type: DataType.STRING,
      allowNull: false,
  })
  audio!: string;

  @Column({
      type: DataType.STRING,
      allowNull: false,
  })
  pdf!: string

  @HasMany(() => Comments)
  comments!: Comments[];

}