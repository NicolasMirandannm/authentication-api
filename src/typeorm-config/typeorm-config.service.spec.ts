import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "../config/config.service";
import { TypeOrmConfigService } from "./typeorm-config.service"

describe('TypeOrmConfigService', () => {
    let typeOrmConfigService: TypeOrmConfigService;
    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TypeOrmConfigService,
                {
                    provide: ConfigService,
                    useValue: jest.fn()
                }
            ]
        }).compile();

        typeOrmConfigService = module.get<TypeOrmConfigService>(TypeOrmConfigService)
    })
    it('should be defined', () => {
        expect(typeOrmConfigService).toBeDefined()
    })
})