import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../models/user.entity';
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
      const newUser = await this.userRep.create(user);
      const createdUser = await this.userRep.save(newUser);
      return {
        ...createdUser,
        password: undefined,
      };
    } catch (error) {
      this.logger.error(
        error.message || 'Ocorreu um erro ao tentar criar um novo usuário',
      );
      throw new BadRequestException(
        'Ocorreu um erro ao tentar criar um novo usuário',
      );
    }
  }

  public async findUserByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userRep.findOneBy({
        email,
      });
      return user;
    } catch (error) {
      this.logger.error(error?.message);
      throw new InternalServerErrorException(
        'Ocorreu um erro ao buscas usuário na base de dados.',
      );
    }
  }
}
