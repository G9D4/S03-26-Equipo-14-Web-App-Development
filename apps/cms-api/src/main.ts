
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  const config = new DocumentBuilder()
    .setTitle('CMS API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addTag('CMS')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  app.enableCors();
  await app.listen(3000);
}

void bootstrap();
