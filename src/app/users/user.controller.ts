import { Controller, Post, Body } from '@nestjs/common';
import { UserEntity } from '../../models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserService } from './createUser/create-user.service';
import { isPublic } from '../auth/decorators/is-public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly createUser: CreateUserService) {}

  @isPublic()
  @Post('create')
  async userRegister(@Body() user: CreateUserDto): Promise<UserEntity> {
    return await this.createUser.exec(user);
  }
}
