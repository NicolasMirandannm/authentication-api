import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/models/user.entity";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { CreateUserService } from "./createUser/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [
        UserRepository,
        CreateUserService
    ]
})
export class UserModule {}