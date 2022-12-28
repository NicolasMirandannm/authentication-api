import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  validateUser(email: string, password: string) {
    throw new InternalServerErrorException('not implemented');
  }
}
