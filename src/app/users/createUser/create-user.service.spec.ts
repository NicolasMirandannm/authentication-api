import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserRepository } from "../user.repository";
import { CreateUserService } from "./create-user.service"

describe('CreateUserService', () => {
    let createUser: CreateUserService;
    const mockRep = {
        create: jest.fn()
    }
    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUserService,
                {
                    provide: UserRepository,
                    useValue: mockRep,
                }
            ]
        }).compile();
        createUser = module.get<CreateUserService>(CreateUserService);
    });
    
    it('should be defined', () => {
        expect(createUser).toBeDefined();
    })

    describe('exec method', () => {
        it('should be created a user with encrypted password', async() => {
            const newUser: CreateUserDto = {
                email: 'test@test.com',
                name: 'nicolas',
                lastName: 'lima',
                password: 'test123',
                phoneNumber: '0000000-0000'
            };
            const result = await createUser.exec(newUser);
            expect(mockRep.create).not.toBeCalledWith({password: newUser.password})
        })
    })
})