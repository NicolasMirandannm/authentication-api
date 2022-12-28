import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async validateUser(email: string, password: string) {
    const user = await this.userRepository.findUserByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new NotFoundException('Usuário e/ou senha inválida.');
  }
}
