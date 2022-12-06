import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "src/config/config.module";
import { TypeOrmConfigService } from "./typeorm-config.service";

@Global()
@Module({
    imports: [ConfigModule],
    providers: [TypeOrmConfigService],
    exports: [TypeOrmConfigService]
})
export class TypeOrmConfigModule {}