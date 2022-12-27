import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser(login: string, password: string) {
    console.log('teste');
    throw new InternalServerErrorException('not implemented');
  }
}
