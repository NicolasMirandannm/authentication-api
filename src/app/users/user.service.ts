import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/models/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    public async createUser(user: CreateUserDto): Promise<UserEntity> {
        return await this.userRepository.create(user);
    }
}