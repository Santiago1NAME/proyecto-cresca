import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
        const isProduction = config.get<string>('NODE_ENV') === 'production';

        return {
            type: 'mysql',
            host: config.get<string>('MYSQL_HOST'),
            port: config.get<number>('MYSQL_PORT'),
            username: config.get<string>('MYSQL_USER'),
            password: config.get<string>('MYSQL_PASSWORD'),
            database: config.get<string>('MYSQL_DATABASE'),
            entities: [__dirname + '/../../**/*.entity.{js,ts}'],
            synchronize: !isProduction,
            logging: !isProduction,
        };
    },
};
