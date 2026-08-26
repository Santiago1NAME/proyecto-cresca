import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';

function validateEnv() {
  const required = [
    'MYSQL_HOST',
    'MYSQL_PORT',
    'MYSQL_USER',
    'MYSQL_PASSWORD',
    'MYSQL_DATABASE',
    'JWT_SECRET',
  ];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Faltan variables de entorno obligatorias: ${missing.join(', ')}. ` +
        `Configúralas en tu archivo .env antes de iniciar la aplicación.`,
    );
  }

  const jwtSecret = process.env.JWT_SECRET!;
  if (jwtSecret.length < 32) {
    throw new Error(
      `JWT_SECRET debe tener al menos 32 caracteres (actual: ${jwtSecret.length}). ` +
        `Usa: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" para generar uno seguro.`,
    );
  }

  const weakSecrets = [
    'defaultSecretKey',
    'secret',
    'jwt_secret',
    'mi_clave',
    'change_me',
  ];
  if (weakSecrets.some((weak) => jwtSecret.toLowerCase().includes(weak))) {
    throw new Error(
      'JWT_SECRET contiene un valor débil o predecible. ' +
        'Usa un secreto criptográficamente seguro.',
    );
  }
}

async function bootstrap() {
  validateEnv();

  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((err) => ({
          field: err.property,
          messages: Object.values(err.constraints ?? {}),
        }));

        return new BadRequestException({
          message: 'Errores de validación',
          errors: formattedErrors,
        });
      },
    }),
  );

  await app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
