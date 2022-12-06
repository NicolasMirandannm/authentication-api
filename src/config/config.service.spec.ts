import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "./config.service"

describe('ConfigService', () => {
    let configService: ConfigService;

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ConfigService,
                {
                    provide: String,
                    useValue: 'envs/.env',
                }
            ]
        }).compile();

        configService = module.get<ConfigService>(ConfigService);
    })

    it('should be defined', () => {
        expect(configService).toBeDefined();
    })

    it('should return "TESTE" string in get method', () => {
        const response = configService.get('TEST');
        expect(response).toEqual("TESTE")
    })
})