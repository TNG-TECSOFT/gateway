import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import Axios from 'axios';
import { userQueries } from '../constants/queries';

const SERVICE_SCOPE = 'core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const permissions = this.reflector.get<{actionAlias: string[], resourceAlias: string}>(
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      throw new UnauthorizedException({
        message: 'Forbidden resource',
        error: {
          title: 'Missing authorization header.',
        },
      });
    }

    const userPermissions: any = await Axios.post(
      `${process.env.USER_API}/users`,
      {
        // query: userQueries.queries.getUserAuthV2,
        query: userQueries.queries.getUserAuth,
        variables: {
          permissions,
          apiName: SERVICE_SCOPE,
        },
      },
      {
        headers: {
          authorization: request.headers.authorization,
        },
      },
    );

    if (!userPermissions.data.data) {
      throw new UnauthorizedException({
        message: 'Forbidden resource',
        error: {
          title: userPermissions.data.errors[0].message,
        },
      });
    }
    return !!userPermissions.data.data;
  }
}
