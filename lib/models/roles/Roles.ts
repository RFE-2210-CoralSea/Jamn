import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Bands } from '../bands/Bands';
import { Users } from '../users/Users';

@Table({
  tableName: 'roles',
  timestamps: true
})


export class Roles extends Model {
  @ForeignKey(() => Bands)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  band_id!: number;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  admin!: boolean
}