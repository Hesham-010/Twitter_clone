import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  PrimaryKey,
  Table,
  UpdatedAt,
  Model,
} from 'sequelize-typescript';
import { Users } from 'src/users/tables/users.table';

@Table
export class Follow extends Model {
  @PrimaryKey
  @Column
  id: string;

  @ForeignKey(() => Users)
  @Column
  followerId: string;

  @Column
  @ForeignKey(() => Users)
  followingId: string;

  @BelongsTo(() => Users)
  user: Users;

  @Column
  @CreatedAt
  createdAt: Date;

  @Column
  @UpdatedAt
  updatedAt: Date;
}
