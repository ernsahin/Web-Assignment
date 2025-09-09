import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          frameAncestors: ["'none'"],
        },
      },
      crossOriginEmbedderPolicy: false,
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
      },
      noSniff: true,
      xssFilter: false,
      frameguard: false,
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3001);
}

bootstrap().catch((err) => {
  console.error('Application failed to start:', err);
});
