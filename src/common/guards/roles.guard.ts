import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(role: string[], userRole: string) {
    return role.some((roles) => roles === userRole);
  }

  canActivate(context: ExecutionContext): boolean {
    // لإستخراج الأدوار من ال role decorator
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context).getContext();
    return this.matchRoles(roles, ctx.req.user.role);
  }
}
