import { Controller, Post, Body } from '@nestjs/common';
import { UserEntity } from '../../models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserService } from './createUser/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly createUser: CreateUserService) {}

  @Post('create')
  async userRegister(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.createUser.exec(user);
  }
}
