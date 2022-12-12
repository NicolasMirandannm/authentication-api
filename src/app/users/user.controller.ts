import { Controller, Post, Body } from "@nestjs/common";
import { UserEntity } from "src/models/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    async userRegister(@Body() user: CreateUserDto): Promise<UserEntity> { 
        return this.userService.createUser(user)
    }
}