import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/utils/enum_roles';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
