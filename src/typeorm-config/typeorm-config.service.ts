import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from "../config/config.service";
import * as path from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    public createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
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
                serviceName: this.configService.get('POSTGRES_SERVICE_NAME'),
                entities: [path.join(__dirname + '/../**/*.entity{.ts,.js}')],
                migrations: [path.join(__dirname + '/../**/migration/*{.ts, .js}')],
                synchronize: true, // setar synchronize para false em ambientes de produção
                logging: true,
                cli: {
                    migrationsDir: 'src/db/migration'
                }
            }
        };
        console.log(connections.postgres.entities)
        return connections[connectionName] ? connections[connectionName] : connections.postgres
    }
}