import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { config } from 'dotenv';
import { verify } from 'jsonwebtoken';
config();

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    let token;
    if (ctx.req.headers.authorization) {
      token = ctx.req.headers.authorization.split(' ')[1];
    } else {
      throw new UnauthorizedException();
    }
    const decoded = await verify(token, 'SI_FRBJHGNS_DLVP_ADKVOsdb');
    if (decoded) {
      ctx.req = decoded;
    } else {
      throw new UnauthorizedException();
    }
    return true;
  }
}
