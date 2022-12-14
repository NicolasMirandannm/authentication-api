import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../models/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(user: CreateUserDto): Promise<UserEntity> {
    const saltOrRoundsNum = 10;
    const encryptedPassword = await bcrypt.hash(user.password, saltOrRoundsNum);
    const newUser = {
        ...user,
        password: encryptedPassword
    }
    return await this.userRepository.create(newUser);
  }
}
