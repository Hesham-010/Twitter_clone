import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Users } from 'src/users/tables/users.table';
import { paginate } from 'src/utils/pagination/paginate';

@Table
export class Tweets extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column
  content: string;

  @Column
  tweetImage: string;

  @ForeignKey(() => Users)
  @Column
  userId: string;

  @BelongsTo(() => Users)
  user: Users;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  static async paginate(page, limit) {
    return paginate(this, page, limit);
  }
}
