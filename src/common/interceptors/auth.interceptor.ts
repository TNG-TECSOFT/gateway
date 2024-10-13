import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { envs } from '../../config/envs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    try {
      const request = context.switchToHttp().getRequest();
      const authorization = request.headers.authorization;

      const decodedToken = jwt.decode(authorization.replace('Bearer', '').trim());
      if (typeof decodedToken === 'object' && decodedToken !== null) {
        const payload = {
          name: decodedToken.name,
          username: decodedToken['cognito:username'],
          email: decodedToken.email,
        };

        const secret = envs.secret_key;
        const options = { expiresIn: '2m' };
        const token = jwt.sign(payload, secret, options);
        request.headers.authorization = token;
      } else {
        throw new Error('Invalid token format');
      }

      return next.handle();
    } catch (error) {
      throw new Error('Failed to generate token');
   }
  }
}
