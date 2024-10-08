import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { envs } from '../../config/envs';

@Injectable()
export class AuthService {
  getToken(authorization: string): string {
    try {
      const decodedToken = jwt.decode(authorization.replace('Bearer', '').trim());
      if (typeof decodedToken === 'object' && decodedToken !== null) {
        const payload = {
          name: decodedToken.name,
          username: decodedToken['cognito:username'],
          email: decodedToken.email,
        };

        const secret = envs.secret_key;
        const options = { expiresIn: '2m' };

        return jwt.sign(payload, secret, options);
      } else {
        throw new Error('Invalid token format');
      }
    } catch (error) {
      throw new Error('Failed to generate token');
    }
  }
}
