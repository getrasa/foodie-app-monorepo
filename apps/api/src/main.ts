import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      process.env.WEB_APP_URL,
    ].filter(Boolean),
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
