import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from "src/config/config.service";
import * as path from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    public createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        const connections = {
            postgres: {
                name: 'postgres',
                type: this.configService.get('POSTGRES_TYPE'),
                host: this.configService.get('POSTGRES_HOST'),
                port: parseInt(this.configService.get('POSTGRES_PORT')),
                username: this.configService.get('POSTGRES_USERNAME'),
                password: this.configService.get('POSTGRES_PASSWORD'),
                database: this.configService.get('POSTGRES_DATABASE'),
                schema: this.configService.get('POSTGRES_SCHEMA'),
                entities: [path.join(__dirname + '/../**/*.entity{.ts,.js}')],
                synchronize: true,
            }
        };
        return connections[connectionName] ? connections[connectionName] : connections.postgres
    }
}