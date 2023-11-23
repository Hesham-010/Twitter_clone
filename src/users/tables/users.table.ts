import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Follow } from 'src/follow/tables/follow.table';
import { Tweets } from 'src/tweets/tables/tweet.table';
import { paginate } from 'src/utils/pagination/paginate';

@Table
export class Users extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  password: string;

  @Column
  role: string;

  @Column
  avatarImage: string;

  @Column
  passwordResetCode: string;

  @Column
  passwordResetExpiration: string;

  @Column
  verifyResetCode: boolean;

  @HasMany(() => Tweets)
  tweets: Tweets[];

  @HasMany(() => Follow)
  follow: Follow[];

  @HasMany(() => Follow)
  following: Follow[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  static async paginate(page: number, limit: number) {
    return paginate<Users>(this, page, limit);
  }
}
