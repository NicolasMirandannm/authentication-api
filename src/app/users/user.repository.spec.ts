import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../../models/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRepository } from "./user.repository"


const userDto:CreateUserDto = {
    email:'test@test.com',
    name: 'nicolas',
    lastName: 'lima',
    password: 'Nicolas123',
    phoneNumber: '(00)00000-0000'
};

describe('UserRepository', () => {
    let userRep: UserRepository;
    const mockRep = {
        create: jest.fn(),
        save: jest.fn()
    }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserRepository,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: mockRep
                }
            ]
        }).compile();
        userRep = module.get<UserRepository>(UserRepository);
    })
    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should be defined', () => {
        expect(userRep).toBeDefined()
    })

    describe('create', () => {
        it('should return a created user without password', async() => {
            mockRep.create.mockResolvedValue(userDto);
            mockRep.save.mockResolvedValue(userDto);
            
            const result = await userRep.create(userDto);
            expect(result.password).toBeUndefined();
        });

        it('should throw a badRequestException when cannot it possible create user', async() => {
            mockRep.create.mockRejectedValue(new Error());
            expect(async() => {
                await userRep.create(userDto);
            }).rejects.toThrow(new BadRequestException(
                'Ocorreu um erro ao tentar criar um novo usuário',
              ))
        })
    })
})