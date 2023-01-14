import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Posts } from '../posts/Posts'
import { Users } from '../users/Users'

@Table({
  timestamps: true,
  tableName: 'comments',
})

export class Comments extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    defaultValue: 1
  })
  id!: number;

  @ForeignKey(() => Posts)
  @Column({
      type: DataType.INTEGER,
      allowNull: false,
  })
  post_id!: number;

  @BelongsTo(() => Posts)
  post!: Posts;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @BelongsTo(() => Posts)
  posts!: Posts;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;
}