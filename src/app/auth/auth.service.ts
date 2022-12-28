import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/models/user.entity';
import { UserPayload } from './models/user-payload.model';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/user-token.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
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

  public login(user: UserEntity): UserToken {
    try {
      const payload: UserPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
      };

      const jwtToken = this.jwtService.sign(payload);

      return {
        name: user.name,
        acess_token: jwtToken,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Ocorreu um erro ao gerar o token de acesso.',
      );
    }
  }
}
