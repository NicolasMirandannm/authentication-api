import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  readonly logger = new Logger(UserRepository.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRep: Repository<UserEntity>,
  ) {}

  public async create(user: CreateUserDto): Promise<UserEntity> {
    try {
      const encryptedPassword = { ...user, password: 'senha criptografada' };
      const newUser = await this.userRep.create(encryptedPassword);
      return await this.userRep.save(newUser);
    } catch (error) {
      this.logger.error(
        error.message || 'Ocorreu um erro ao tentar criar um novo usuário',
      );
      throw new BadRequestException(
        'Ocorreu um erro ao tentar criar um novo usuário',
      );
    }
  }
}
