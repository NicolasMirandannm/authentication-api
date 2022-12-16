import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserService } from "./createUser/create-user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserController } from "./user.controller"

describe('UserController', () => {
    let userController: UserController;
    const mockCreateUserRep ={
        exec: jest.fn()
    }
    beforeEach(async() => {
        const module:TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: CreateUserService,
                    useValue: mockCreateUserRep
                }
            ]
        }).compile();
        userController = module.get<UserController>(UserController);
    })
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should be defined', () => {
        expect(userController).toBeDefined()
    })

    describe('useRegister', () => {
        it('should call internal method exec', async() => {
            const userDto:CreateUserDto = {
                email:'test@test.com',
                name: 'nicolas',
                lastName: 'lima',
                password: 'Nicolas123',
                phoneNumber: '(00)00000-0000'
            };
            await userController.userRegister(userDto);
            expect(mockCreateUserRep.exec).toHaveBeenCalledTimes(1)
        })
    })
})